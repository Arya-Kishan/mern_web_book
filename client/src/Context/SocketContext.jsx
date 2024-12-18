import { createContext, useEffect, useState } from "react";
import { selectLoggedInUser } from "../Redux/Auth/AuthSlice";
import { io } from "socket.io-client"
import { handleError } from '../helper/CreateError';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { globalInterviewApi } from "../Redux/GlobalInterview/GlobalInterviewApi";
import { globalMcqApi } from "../Redux/GlobalMcq/GlobalMcqApi";
import { globalInterviewCommentApi } from "../Redux/Comment/GlobalInterviewCommentApi";
import { globalMcqCommentApi } from "../Redux/Comment/globalMcqCommentApi";
import { useAddNotificationMutation } from "../Redux/Notification/NotificationApi";
import { setGameNotifications } from "../Redux/Games/gameSlice";

export const MyContext = createContext("");
export let globalSocket = null;

const SocketContextProvider = ({ children }) => {

    const [onlineUsers, setOnlineUsers] = useState([])
    const [isSocketConnected, setIsSocketConnected] = useState("connecting");
    const loggedInUser = useSelector(selectLoggedInUser)
    const dispatch = useDispatch();
    const [addNotification] = useAddNotificationMutation();

    const isUserOnline = (receiverId) => {
        if (onlineUsers.includes(receiverId)) {
            return true;
        }
        return false;
    }

    const saveNotificationDatabase = ({ to, message, category, cardId, action }) => {
        let globalMcqId = category == "globalMcq" ? cardId : null;
        let postId = category == "post" ? cardId : null;
        let globalInterviewId = category == "globalInterview" ? cardId : null;
        addNotification({ from: loggedInUser._id, to: to, message: message, category: category, post: postId, globalMcq: globalMcqId, globalInterview: globalInterviewId, action: action });
    }

    const sendSocketNotification = ({ to, message, category, cardId, action = "" }) => {

        // WHY WOULD I WILL SEND LIKE NOTIFICATION TO MYSELF FOR MY POST
        if (to == loggedInUser._id) {
            return null;
        }

        if (isUserOnline(to)) {
            globalSocket.emit("send-notification", { receiverId: to, category: category, message: message })
            return null;
        }

        if (!isUserOnline(to)) {
            saveNotificationDatabase({ to, message, category, cardId, action })
        }

    }

    const refetchingData = (category) => {

        if (category == "globalInterview") {
            dispatch(globalInterviewApi.util.invalidateTags(['GlobalInterview']))
        } else if (category == "globalMcq") {
            dispatch(globalMcqApi.util.invalidateTags(['GlobalMcq']))
        } else if (category == "globalInterviewComment") {
            dispatch(globalInterviewApi.util.invalidateTags(['GlobalInterview']))
            dispatch(globalInterviewCommentApi.util.invalidateTags(['GlobalInterviewComment']))
        } else if (category == "globalMcqComment") {
            dispatch(globalMcqApi.util.invalidateTags(['GlobalMcq']))
            dispatch(globalMcqCommentApi.util.invalidateTags(['GlobalMcqComment']))
        }

    }


    useEffect(() => {

        if (loggedInUser) {

            globalSocket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
                query: {
                    userId: loggedInUser._id,
                }
            });

            globalSocket.on("connect", () => {
                setIsSocketConnected("connected");
            })

            globalSocket.on("receive-notification", ({ category, message }) => {
                let notification = message.split("-")[0]
                let notification_title = message.split("-")[1]
                toast(<div>
                    <p>{notification}</p>
                    <p className="font-bold">{notification_title}</p>
                </div>)
                refetchingData(category)
            })

            globalSocket.on("receive-game-notification", ({ sender, receiver, game, message, data }) => {
                dispatch(setGameNotifications({ sender, game, time: Date.now() }));
                toast(<div>
                    <p>{message}</p>
                    <p className="font-bold">{game}</p>
                </div>);
            })

            globalSocket.on("onlineUsers", (data) => {
                setOnlineUsers(data);
                (data);
            })

            // THIS IS RELATED TO CHAT TO LET USER KNOW SOMEONE MESSAGED HIM
            globalSocket.on("someone-messaged", ({ sender, receiver, message }) => {
                if (window.location.pathname.search("chat") == -1) {
                    toast(sender.name + " trying to message")
                }
            })

            globalSocket.on("connect_error", (error) => {
                console.log("not connected to socket error occured");
                console.log(error);
                setIsSocketConnected("errorInConnecting")
                handleError(`${error.name}:${error.message}` ?? "Error Occured", "Error in Connecting to Socket", "Socket JSX")
            })

        }

        return () => {
            globalSocket?.disconnect();
        }

    }, [loggedInUser])


    return <MyContext.Provider value={{ onlineUsers, globalSocket, sendSocketNotification, isSocketConnected }}>
        {children}
    </MyContext.Provider>
}

export default SocketContextProvider;
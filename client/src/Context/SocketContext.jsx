import { createContext, useEffect, useState } from "react";
import { selectLoggedInUser } from "../Redux/Auth/AuthSlice";
import { io } from "socket.io-client"
import { handleError } from '../helper/CreateError';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

export const MyContext = createContext("");
export let globalSocket = null;

const SocketContextProvider = ({ children }) => {

    const [onlineUsers, setOnlineUsers] = useState([])
    const loggedInUser = useSelector(selectLoggedInUser)

    const sendSocketNotification = ({ to, message, category, cardId }) => {
        console.log({ to, message, category, cardId });

        if (to == loggedInUser._id) {
            return null;
        } else {
            globalSocket.emit("send-notification", { receiverId: to, message: message })
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
                console.log("connected to socket");
            })

            globalSocket.on("receive-notification", (data) => {
                console.log("receiving notification : " + data);
                console.log(data);
                let message = data.split("-")[0]
                let title = data.split("-")[1]
                toast(<div>
                    <p>{message}</p>
                    <p className="font-bold">{title}</p>
                </div>)
            })

            globalSocket.on("onlineUsers", (data) => {
                console.log(data);
                setOnlineUsers(data);
                (data);
            })

            globalSocket.on("connect_error", (error) => {
                console.log("not connected to socket error occured");
                handleError(error ?? "Error Occured", "Error in Connecting to Socket", "Socket JSX")
            })


        }

        return () => {
            globalSocket?.disconnect();
        }

    }, [loggedInUser])


    return <MyContext.Provider value={{ onlineUsers, globalSocket, sendSocketNotification }}>
        {children}
    </MyContext.Provider>
}

export default SocketContextProvider;
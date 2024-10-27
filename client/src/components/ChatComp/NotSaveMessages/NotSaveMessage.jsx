import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../../Redux/Auth/AuthSlice'
import { useParams } from 'react-router-dom'
import { MyContext } from '../../../Context/SocketContext'
import { toast } from 'react-toastify'
import InputMessage from '../InputMessage'
import NotSavedMessageCard from './NotSavedMessageCard'

const NotSaveMessage = () => {
    const [messages, setMessages] = useState([]);
    const [clearMessages, setClearMessages] = useState(false);
    const loggedInUser = useSelector(selectLoggedInUser);
    const params = useParams();
    const opponentUserId = params.userId;
    const searchParams = new URLSearchParams(location.search);
    const opponentName = searchParams.get('name');

    const { globalSocket, onlineUsers } = useContext(MyContext);

    const handleSend = (input) => {

        if (!onlineUsers.includes(opponentUserId)) {
            input = ""
            return toast(<div>
                <p>User offline</p>
                <p>Check Info</p>
            </div>)
        }

        if (input.length < 1) {
            return toast("Write Message")
        }
        // SENDING MESSAGE
        globalSocket.emit("send-message", { sender: { _id: loggedInUser._id, name: loggedInUser.name }, receiver: { _id: opponentUserId, name: opponentName }, message: { type: 'text', value: input } })

        setMessages((prev) => ([...prev, { sender: { _id: loggedInUser._id, name: loggedInUser.name }, receiver: { _id: opponentUserId, name: opponentName }, message: { type: 'text', value: input } }]))

        // USED FOR CLEANING INPUT
        setClearMessages(!clearMessages);

    }

    useEffect(() => {

        // RECEIVING MESSAGE
        globalSocket.on("receive-message", ({ sender, receiver, message }) => {
            setMessages((prev) => ([...prev, { sender, receiver, message }]))
            globalSocket.emit("delivered", { sender, receiver, message })
        })

        return () => globalSocket?.off("receive-message");

    }, [])

    return (
        <div className='w-full h-full relative'>

            <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-1 pt-2'>

                {/* CHAT SECTION */}
                <div className='w-full h-[calc(100dvh-127px)] md:h-[calc(100dvh-182px)] flex flex-col gap-2 overflow-scroll'>
                    {
                        onlineUsers.includes(opponentUserId)
                            ?
                            messages?.map((e, i) => (
                                <NotSavedMessageCard key={i} e={e} />
                            ))
                            :
                            <div className='w-full h-full flex justify-center items-center'>
                                <p onClick={() => setShowWarning(true)}>USER IS OFFLINE</p>
                            </div>
                    }
                </div>

                {/* INPUT SECTION */}
                <InputMessage onSend={handleSend} clearMessages={clearMessages} />

            </div>

        </div>
    )
}

export default NotSaveMessage
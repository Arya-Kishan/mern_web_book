import React, { useContext, useEffect, useRef, useState } from 'react'
import MyImage from '../../components/MyImage'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { useParams } from 'react-router-dom'
import sendIcon from "../../assets/send.svg"
import { MyContext } from '../../Context/SocketContext'
import { toast } from 'react-toastify'
import MessageCard from './MessageCard'
import threeDotIcon from '../../assets/threeDot.svg'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const loggedInUser = useSelector(selectLoggedInUser);
    const params = useParams();
    const inputRef = useRef("");
    const opponentUserId = params.userId;
    const searchParams = new URLSearchParams(location.search);
    const opponentName = searchParams.get('name');

    const { globalSocket, onlineUsers } = useContext(MyContext);

    const handleSend = () => {

        if (!onlineUsers.includes(opponentUserId)) {
            inputRef.current.value = ""
            return toast(<div>
                <p>User offline</p>
                <p>Check Info</p>
            </div>)
        }

        if (inputRef.current.value.length < 1) {
            return toast("Write Message")
        }
        // SENDING MESSAGE
        globalSocket.emit("send-message", { sender: { _id: loggedInUser._id, name: loggedInUser.name }, receiver: { _id: opponentUserId, name: opponentName }, message: { type: 'text', value: inputRef.current.value } })

        setMessages((prev) => ([...prev, { sender: { _id: loggedInUser._id, name: loggedInUser.name }, receiver: { _id: opponentUserId, name: opponentName }, message: { type: 'text', value: inputRef.current.value } }]))

    }

    useEffect(() => {

        // RECEIVING MESSAGE
        globalSocket.on("receive-message", ({ sender, receiver, message }) => {
            setMessages((prev) => ([...prev, { sender, receiver, message }]))
            globalSocket.emit("delivered", { sender, receiver, message })
        })

        return () => globalSocket?.off("receive-message");

    }, [])

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            handleSend()
        }
    }

    useEffect(() => {
        inputRef.current.value = ""
    }, [messages])

    console.log(messages);

    return (
        <div className='w-full h-full relative'>

            <div className='w-full h-[32px] flex justify-between'>
                <p className='text-2xl font-semibold border-b-2 border-white capitalize'>Chat</p>
                <div className='flex items-center'>
                    <MyImage className={"w-[32px] h-[32px]"} onClick={() => { }} src={`https://api.multiavatar.com/${opponentName}.svg`} alt="" />
                    <MyImage src={threeDotIcon} className={"w-[25px] h-[25px]"} onClick={() => setShowWarning(true)} />
                </div>
            </div>

            <div className='w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-1 pt-2'>

                {/* CHAT SECTION */}
                <div className='w-full h-[calc(100dvh-127px)] md:h-[calc(100dvh-182px)] flex flex-col gap-2 overflow-scroll'>
                    {
                        onlineUsers.includes(opponentUserId)
                            ?
                            messages?.map((e, i) => (
                                <MessageCard key={i} e={e} />
                            ))
                            :
                            <div className='w-full h-full flex justify-center items-center'>
                                <p onClick={() => setShowWarning(true)}>USER IS OFFLINE</p>
                            </div>
                    }
                </div>

                {/* INPUT SECTION */}
                <div className='w-full h-[50px] bg-transparent flex items-center justify-between border-2 rounded-[20px] p-2'>
                    <input ref={inputRef} onKeyUp={handleEnter} type="text" className='w-full h-full text-[16px] bg-transparent' />
                    <MyImage src={sendIcon} className={"w-[30px] h-[30px]"} onClick={handleSend} />
                </div>

            </div>

            {
                showWarning
                &&
                <div onClick={() => setShowWarning(false)} className='w-[100vw] h-[100vh] md:w-full md:h-full fixed md:absolute top-0 left-0 flex justify-center items-center bg-[#0000007a]'>
                    <div onClick={(e) => e.preventDefault()} className='w-[50%] h-[50%] bg-bgFilterPop flex justify-center items-center flex-col gap-4 p-2 text-center'>
                        <p>You can talk when user is online</p>
                        <p>Message history are not saved</p>
                        <p>Once you go back messages will be deleted automatically</p>
                        <p className='text-red-800'>Chat will automatically closed when user goes offline</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default Chat
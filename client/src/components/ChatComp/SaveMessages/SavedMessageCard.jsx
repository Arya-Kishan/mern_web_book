import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../../Redux/Auth/AuthSlice'
import { MyContext } from '../../../Context/SocketContext';
import sentIcon from "../../../assets/sent.svg"
import MyImage from '../../../components/MyImage';
import dayjs from 'dayjs'

const SavedMessageCard = ({ e }) => {
    const [showTick, setShowTick] = useState(false);
    const loggedInUser = useSelector(selectLoggedInUser);
    const divRef = useRef("");
    const { globalSocket, onlineUsers } = useContext(MyContext);

    useEffect(() => {
        globalSocket.on("receiver-received-message", ({ sender, receiver, message }) => {
            console.log("MESSAGE RECEIVED BY THE USER");
            if (message.value == e.message.value) {
                setShowTick(true);
            }
        })
    }, [])

    useEffect(() => {
        divRef.current.scrollIntoView({ behaviour: "smooth" })
    }, [showTick])

    return (
        <div ref={divRef} className={`w-full flex ${e.sender._id == loggedInUser._id ? "justify-end" : "justify-start"}`}>
            <div className='w-[45%] max-w-[60%] h-fit bg-green-600 flex flex-col p-2 rounded-xl'>
                <p className='text-[10px]'>{e.sender.name}</p>
                <p>{e.message?.value ?? e.message}</p>
                <div className='w-full h-[10px] flex justify-end text-[10px] items-center gap-1'>
                    {dayjs(Date.now()).format("hh:mm")}
                    {showTick && <MyImage src={sentIcon} className={"w-[10px] h-[10px]"} />}
                </div>
            </div>
        </div>
    )
}

export default SavedMessageCard
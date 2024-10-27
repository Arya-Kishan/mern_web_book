import React, { useContext, useEffect, useRef, useState } from 'react'
import MyImage from '../../components/MyImage'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { useParams } from 'react-router-dom'
import { MyContext } from '../../Context/SocketContext'
import NotSaveMessage from '../../components/ChatComp/NotSaveMessages/NotSaveMessage'
import saveMessageIcon from "../../assets/saveMessage.svg"
import notSaveMessageIcon from "../../assets/notSaveMessage.svg"
import SaveMessage from '../../components/ChatComp/SaveMessages/SaveMessage'

const Chat = () => {

    const [conversationType, setConversationType] = useState("save")
    const loggedInUser = useSelector(selectLoggedInUser);
    const params = useParams();
    const opponentUserId = params.userId;
    const searchParams = new URLSearchParams(location.search);
    const opponentName = searchParams.get('name');

    const { globalSocket, onlineUsers } = useContext(MyContext);


    const handleToggle = (word) => {
        if (word == "save") {
            setConversationType("save")
            globalSocket.emit("send-changed-conversationType", { sender: { _id: loggedInUser._id, name: loggedInUser.name }, receiver: { _id: opponentUserId, name: opponentName }, conversationType: 'save' })
        } else {
            globalSocket.emit("send-changed-conversationType", { sender: { _id: loggedInUser._id, name: loggedInUser.name }, receiver: { _id: opponentUserId, name: opponentName }, conversationType: 'unsave' })
            setConversationType("unsave")
        }
    }

    useEffect(() => {

        globalSocket.on("receive-changed-conversationType", ({ sender, receiver, conversationType }) => {
            if (conversationType == "unsave") {
                setConversationType("unsave")
            } else {
                setConversationType("save")
            }
        })

    }, [])

    return (
        <div className='w-full h-full'>

            <div className='w-full h-[32px] flex justify-between'>
                <div className='flex items-center gap-4'>
                    <MyImage className={"w-[32px] h-[32px]"} onClick={() => { }} src={`https://api.multiavatar.com/${opponentName}.svg`} alt="" />
                    <div className='flex flex-col'>
                        <p>{opponentName}</p>
                        <p className='text-[10px] text-customGreen'>
                            {onlineUsers.includes(opponentUserId)
                                ?
                                "online"
                                :
                                "offline"
                            }
                        </p>
                    </div>
                </div>

                {/* TOGGLE SAVE AND UNSAVE */}
                <div className='w-[100px] md:w-[200px] flex gap-1'>
                    <div className='w-[300px] flex gap-1 items-center'>
                        <div onClick={() => handleToggle("save")} className={`flex gap-1 items-center w-[60px] md:w-[100px] rounded-2xl justify-center p-1 ${conversationType == "save" ? "bg-bgHistoryPop" : "bg-transparent"}`}>
                            <MyImage src={saveMessageIcon} className={"w-[20px] h-[20px]"} />
                            <p className='hidden md:block'>save</p>
                        </div>
                        <div onClick={() => handleToggle("unsave")} className={`flex gap-1 items-center w-[60px] md:w-[100px] rounded-2xl justify-center p-1 ${conversationType == "unsave" ? "bg-bgHistoryPop" : "bg-transparent"}`}>
                            <MyImage src={notSaveMessageIcon} className={"w-[20px] h-[20px]"} />
                            <p className='hidden md:block'>unsave</p>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                {
                    conversationType == "save"
                        ?
                        <SaveMessage />
                        :
                        <NotSaveMessage />
                }
            </div>



        </div>
    )
}

export default Chat
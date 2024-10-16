import React, { useContext, useEffect, useRef, useState } from 'react'
import MyImage from '../../components/MyImage'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import { useParams } from 'react-router-dom'
import { MyContext } from '../../Context/SocketContext'
import Toggle from '../../components/common/Toggle'
import NotSaveMessage from '../../components/ChatComp/NotSaveMessages/NotSaveMessage'
import saveMessageIcon from "../../assets/saveMessage.svg"
import unSaveMessageIcon from "../../assets/unSaveMessage.svg"
import SaveMessage from '../../components/ChatComp/SaveMessages/SaveMessage'
import { useEditUserMutation } from '../../Redux/User/UserApi'

const Chat = () => {

    const toggleRef = useRef("");
    const [conversationType, setConversationType] = useState("save")
    const loggedInUser = useSelector(selectLoggedInUser);
    const params = useParams();
    const opponentUserId = params.userId;
    const searchParams = new URLSearchParams(location.search);
    const opponentName = searchParams.get('name');

    const [editUser] = useEditUserMutation();

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

        if (!loggedInUser.mychats.includes(opponentUserId)) {
            editUser({ id: loggedInUser._id, new_chat: opponentUserId })
        }

        globalSocket.on("receive-changed-conversationType", ({ sender, receiver, conversationType }) => {
            if (conversationType == "unsave") {
                setConversationType("unsave")
                toggleRef.current.handleSelectToggle({ text: "unsave" })
                setConversationType("unsave")
            } else {
                toggleRef.current.handleSelectToggle({ text: "save" })
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

                <div className='w-[100px] md:w-[200px] flex gap-1'>
                    <Toggle buttonsArr={[{ text: "save", pic: saveMessageIcon }, { text: "unsave", pic: unSaveMessageIcon }]} onChange={handleToggle} ref={toggleRef} />
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
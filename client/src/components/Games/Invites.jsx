import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGameNotifications, selectGameNotifications } from '../../Redux/Games/gameSlice'
import { MyContext } from '../../Context/SocketContext'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'
import bellIcon from "../../assets/icons/bell.svg"
import MyImage from '../MyImage'
import { getTimeAgo, getTimeDifferenceInMinute } from '../../helper/customFunction'

const Invites = ({ handleAcceptUserInvitation, show, setShow, game = "Tic Tac Toe" }) => {

    const gameNotifications = useSelector(selectGameNotifications)
    const loggedInUSER = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    const { globalSocket, onlineUsers } = useContext(MyContext);

    const handleInvite = (wtd, user) => {
        if (wtd == "join" && onlineUsers.includes(user._id)) {
            handleAcceptUserInvitation(user);
            globalSocket.emit("send-game-player-joined", { sender: { name: loggedInUSER.name, _id: loggedInUSER._id }, receiver: { name: user.name, _id: user._id }, data: "notification", category: "games", game: "Tic Tac Toe" });
            setShow(false);
        } else {
            console.log("I HAVE TO REMOVE THIS FROM NOTIFICATION");
            dispatch(deleteGameNotifications(user))
        }
    }

    return (
        <div>

            <div className='relative'>
                <MyImage onClick={() => setShow(true)} src={bellIcon} className={"w-[20px] h-[20px]"} />
                <p className='absolute -top-[5px] right-0 text-[12px]'>{gameNotifications.length == 0 ? "" : gameNotifications.length}</p>
            </div>

            {
                show
                &&
                <div
                    onClick={
                        (e) => {
                            e.stopPropagation()
                            setShow(false)
                        }
                    }
                    className='size-full absolute top-0 left-0 bg-bgOpacity flex justify-center items-center'>

                    <div onClick={e => e.stopPropagation()} className='w-[260px] sm:w-[400px] h-[300px] bg-bgHistoryPop p-4 rounded-xl flex flex-col justify-start items-center gap-4 capitalize overflow-scroll text-[14px]'>
                        {
                            gameNotifications.length > 0
                                ?
                                gameNotifications.map((user, i) => (
                                    <div key={i} className='w-full bg-blue5 rounded-md flex flex-col gap-2 justify-between p-2'>

                                        <div className='flex justify-between items-center'>
                                            <p className='text-[16px] font-bold'>{user.sender.name}</p>
                                            <p className='text-[10px] text-end'>{getTimeAgo(user.time)}</p>
                                        </div>

                                        {
                                            getTimeDifferenceInMinute(user.time) < 1
                                                ?
                                                <div className='flex justify-end gap-2'>
                                                    <p
                                                        onClick={() => handleInvite("join", user.sender)}
                                                        className='w-1/2 text-center rounded-lg bg-bg-card py-1 px-2'>
                                                        join
                                                    </p>
                                                    <p
                                                        onClick={() => handleInvite("busy", user.sender)}
                                                        className='w-1/2 text-center rounded-lg bg-bg-card py-1 px-2'>
                                                        busy
                                                    </p>
                                                </div>
                                                :
                                                <div className='w-full text-center rounded-lg bg-bg-card py-1 px-2'>
                                                    Expired
                                                </div>
                                        }


                                    </div>
                                ))
                                :
                                <div className='size-full flex justify-center items-center'>NO NOTIFICATIONS</div>
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default Invites
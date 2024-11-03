import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { selectGameNotifications } from '../../Redux/Games/gameSlice'
import { MyContext } from '../../Context/SocketContext'
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice'

const Invites = ({ handleAcceptUserInvitation, setShow, game = "Tic Tac Toe" }) => {

    const gameNotifications = useSelector(selectGameNotifications)
    const loggedInUSER = useSelector(selectLoggedInUser);
    const { globalSocket, onlineUsers } = useContext(MyContext);

    const handleInvite = (wtd, user) => {
        if (wtd == "join") {
            handleAcceptUserInvitation(user);
            globalSocket.emit("send-game-player-joined", { sender: { name: loggedInUSER.name, _id: loggedInUSER._id }, receiver: { name: user.name, _id: user._id }, data: "notification", category: "games", game: "Tic Tac Toe" });
            setShow(false);
        } else {
            console.log("I HAVE TO REMOVE THIS FROM NOTIFICATION");
        }
    }

    return (
        <div onClick={
            (e) => {
                e.stopPropagation()
                setShow(false)
            }
        } className='size-full absolute top-0 left-0 bg-bgOpacity flex justify-center items-center'>

            <div onClick={e => e.stopPropagation()} className='w-[300px] sm:w-[400px] h-[300px] bg-bgHistoryPop p-4 rounded-xl flex flex-col justify-start items-center gap-4 capitalize overflow-scroll text-[14px]'>
                {
                    gameNotifications.length > 0
                        ?
                        gameNotifications.map((user, i) => (
                            <div key={i} className='w-full bg-bgNotePop flex gap-2 justify-between p-2'>
                                <p className='text-[16px] font-bold'>{user.name}</p>
                                <div className='flex gap-2'>
                                    <p onClick={() => handleInvite("join", user)} className='w-fit rounded-lg bg-bg-card py-1 px-2'>join</p>
                                    <p onClick={() => handleInvite("busy", user)} className='w-fit rounded-lg bg-bg-card py-1 px-2'>busy</p>
                                </div>
                            </div>
                        ))
                        :
                        <div className='size-full flex justify-center items-center'>NO NOTIFICATIONS</div>
                }
            </div>
        </div>
    )
}

export default Invites
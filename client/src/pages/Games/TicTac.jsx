import React, { useState } from 'react'
import tvIcon from "../../assets/tv.svg"
import multiPlayerIcon from "../../assets/multiPlayer.svg"
import Computer from '../../components/Games/TicTacToe/Computer';
import Player from '../../components/Games/TicTacToe/Player';
import settingIcon from "../../assets/setting.svg"
import bellIcon from "../../assets/icons/bell.svg"
import MyImage from '../../components/MyImage';
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import InviteUser from '../../components/Games/InviteUser';
import Invites from '../../components/Games/Invites';

const TicTac = () => {

    const loggedInUSER = useSelector(selectLoggedInUser);
    const [showChoose, setShowChoose] = useState({ show: true, value: "computer" });
    const [showPlayer, setShowPlayer] = useState(false);
    const [showInvites, setShowInvites] = useState(false);
    const [opponentUser, setOpponentUser] = useState({ name: "choose", _id: "" });
    const [currentUser, setCurrentUser] = useState({ name: loggedInUSER.name, _id: loggedInUSER._id });


    const handleChoose = (choosed) => {
        choosed == "computer" ? setShowChoose({ show: false, value: "computer" }) : setShowChoose({ show: false, value: "player" })
    }


    const handleSelectUser = (selectedUser) => {
        setOpponentUser(selectedUser);
        setShowPlayer(false);
        setShowChoose({ show: false, value: "player" });
    }

    const handleAcceptUserInvitation = (selectedUser) => {
        setOpponentUser(selectedUser);
        setShowChoose({ show: false, value: "player" });
    }

    return (
        <div className='size-full flex flex-col gap-4 justify-start items-center relative'>

            <div className='w-full h-[40px] flex items-center justify-between gap-2'>
                <p className='font-semibold text-xl capitalize border-b-2 border-white'>TIC TAC TOE</p>
                <MyImage src={settingIcon} className={"w-[30px] h-[30px]"} onClick={() => setShowChoose({ show: true, value: "computer" })} />
            </div>

            {/* NAMES OF PERSON */}
            <div className='w-full flex justify-between items-center p-2'>
                <p className='w-[100px] md:w-[150px] bg-red-500 p-2 rounded-lg capitalize text-center'>{currentUser.name}</p>
                <p className='w-[100px] md:w-[150px] bg-red-500 p-2 rounded-lg capitalize text-center'>{opponentUser.name}</p>
            </div>

            <div className='w-full h-full'>
                {
                    showChoose.value == "computer"
                        ?
                        <Computer currentUser={currentUser} opponentUser={{ name: "computer", _id: "" }} />
                        :
                        <Player setShowChoose={setShowChoose} currentUser={currentUser} opponentUser={opponentUser} />
                }
            </div>

            {
                showChoose.show
                &&
                <div className='size-full fixed md:absolute top-0 left-0 bg-bgOpacity flex justify-center items-center'>

                    <div onClick={e => e.stopPropagation()} className='w-[250px] sm:w-[400px] h-fit bg-blue-800 p-4 rounded-xl flex flex-col justify-center items-center gap-4 capitalize'>

                        <div className='w-full flex items-center justify-between gap-2'>
                            <p className='font-bold uppercase'>Play Against</p>
                            {/* GAME CHECK NOTIFICATIONS */}
                            <Invites show={showInvites} setShow={setShowInvites} handleAcceptUserInvitation={handleAcceptUserInvitation} />
                        </div>

                        <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4'>
                            {/* COMPUTER */}
                            <div onClick={() => handleChoose("computer")} className='w-full sm:w-[120px] justify-center gap-2 flex items-center rounded-lg bg-blue-600 p-2'>
                                <MyImage src={tvIcon} className={"w-[20px] h-[20px]"} />
                                <p>computer</p>
                            </div>

                            {/* CHOOSE PLAYER */}
                            <div onClick={() => setShowPlayer(true)} className='w-full sm:w-[120px] justify-center flex items-center gap-2 rounded-lg bg-blue-600 p-2'>
                                <MyImage src={multiPlayerIcon} className={"w-[20px] h-[20px]"} />
                                <p>online</p>
                                {showPlayer && <InviteUser setShow={setShowPlayer} handleSelectUser={handleSelectUser} />}
                            </div>

                        </div>


                    </div>

                </div>
            }

        </div>
    )
}

export default TicTac
import React, { useContext, useEffect, useRef, useState } from 'react'
import { searchUser } from '../../Redux/User/UserApi';
import UserHeading from '../UserHeading';
import Loader from '../Loader';
import debounce from "lodash.debounce"
import { selectLoggedInUser } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { MyContext } from '../../Context/SocketContext';

const InviteUser = ({ handleSelectUser, setShow }) => {

    const loggedInUSER = useSelector(selectLoggedInUser);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const inputRef = useRef("");
    const { globalSocket, onlineUsers } = useContext(MyContext);

    const handleSearch = async () => {
        setLoading(true)
        let result = await searchUser(inputRef.current.value);
        setUser(result);
        setLoading(false)
    }

    const handleDebounce = debounce(() => {
        if (inputRef.current.value.length > 0) {
            handleSearch()
        }
    }, 500)

    const handleChoosedUser = (e) => {
        globalSocket.emit("send-game-notification", { sender: {name:loggedInUSER.name,_id:loggedInUSER._id}, receiver: { name: e.name, _id: e._id }, data: "notification", category: "games", game: "Tic Tac Toe" });
        handleSelectUser({ name: e.name, _id: e._id });
        setShow(false);
    }

    return (
        <div onClick={
            (e) => {
                e.stopPropagation()
                setShow(false)
            }
        } className='size-full absolute top-0 left-0 bg-bgOpacity flex justify-center items-center'>

            <div onClick={e => e.stopPropagation()} className='w-[300px] sm:w-[400px] h-fit bg-teal-800 p-4 rounded-xl flex flex-col justify-center items-center gap-4 capitalize'>
                {/* SEARC USER OR INVITE USER */}
                <div className='w-full h-[340px]'>

                    {/* button and input */}
                    <div className='w-full h-[40px] flex items-center gap-2'>
                        <input ref={inputRef} onChange={handleDebounce} type="text" className='w-full h-[40px] p-2 text-black rounded-lg' placeholder='Search User...' />
                        <button onClick={handleSearch} className='w-[100px] h-[40px] bg-bgNotePop rounded-lg'>Search</button>
                    </div>

                    {/* SEAARCH USER RESULTS */}
                    <div className='w-full h-[300px] flex flex-col gap-2 bg-bgNotePop p-2 rounded-lg overflow-scroll mt-2'>
                        {
                            loading
                                ?
                                <Loader />
                                :
                                user.length < 1
                                    ?
                                    <div className='w-full h-full flex justify-center items-center'>NO USER</div>
                                    :
                                    user.map((e) => (
                                        <div onClick={() => handleChoosedUser(e)} key={e._id} className='w-full flex gap-2 justify-between items-center'>
                                            <UserHeading name={e.name} userId={e._id} navigateToProfile={false} />
                                            <button className='bg-blue-600 p-2 rounded-xl'>Invite</button>
                                        </div>
                                    ))
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default InviteUser
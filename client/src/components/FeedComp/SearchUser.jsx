import React, { useEffect, useRef, useState } from 'react'
import PopUp from '../common/PopUp'
import { searchUser } from '../../Redux/User/UserApi';
import UserHeading from '../UserHeading';
import Loader from '../Loader';
import debounce from "lodash.debounce"

const SearchUser = ({ show, setShow, setRotateArrow }) => {

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const inputRef = useRef("");

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

    useEffect(() => {
        if (show) {
            setRotateArrow(false)
        }
    }, [show])

    return (
        <PopUp show={show} setShow={setShow} bg='bg-transparent'>

            {/* button and input */}
            <div className='w-full flex items-center gap-2'>
                <input ref={inputRef} onChange={handleDebounce} type="text" className='w-full p-2 text-black rounded-lg' placeholder='Search User...' />
                <button onClick={handleSearch} className='w-[100px] h-full bg-bgNotePop rounded-lg'>Search</button>
            </div>

            {/* SEAARCH USER RESULTS */}
            <div className='w-full h-[60vh] flex flex-col gap-2 bg-bgNotePop p-2 rounded-lg'>
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
                                <div key={e._id} className='w-full flex gap-2 items-center'>
                                    <UserHeading name={e.name} userId={e._id} />
                                </div>
                            ))
                }
            </div>

        </PopUp>
    )
}

export default SearchUser
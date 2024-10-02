import React, { lazy, Suspense, useState } from 'react'
import logo from '../assets/logo.svg'
import MyImage from '../components/MyImage';
const AdminError = lazy(() => import("./components/AdminError"))
const AdminUser = lazy(() => import("./components/AdminUser"))

const Home = () => {

    const [options, setOptions] = useState(["users", "errors"]);
    const [selectedOptions, setSelectedOptions] = useState("errors");
    const [pop, setPop] = useState(false);

    const handleOption = (word) => {
        console.log(word);
        setSelectedOptions(word)
        setPop(false);
    }


    return (
        <div className='w-full h-[100vh]'>

            <div className='w-full h-[40px] flex justify-between items-center p-2 bg-blue-600 relative'>
                <p className='text-[30px] font-bold text-white'>Admin</p>
                <MyImage src={logo} className={"w-[30px] h-[30px]"} onClick={() => setPop(!pop)} />
                {pop && <div className='w-[200px] h-[300px] flex flex-col gap-2 absolute top-full right-0 bg-bgNotePop'>
                    {options.map((e) => (
                        <div key={e} onClick={() => handleOption(e)} className='w-full text-white text-[18px] font-medium p-2 cursor-pointer hover:bg-bg-card'>{e}</div>
                    ))}
                </div>}
            </div>

            <Suspense fallback="Loading...">
                {selectedOptions == "errors" && <AdminError />}
                {selectedOptions == "users" && <AdminUser />}
            </Suspense>

        </div>
    )
}

export default Home
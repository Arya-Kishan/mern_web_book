import React, { useEffect, useState } from 'react'
import arrow from '../assets/down_Arrow.svg'
import MyImage from './MyImage';

const DropDown = ({ listArr = ["apple", "guava", "mango"], onChange = () => { } }) => {

    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(listArr);
    const [selectedData, setSelectedData] = useState(listArr[0]);

    const handleSelect = (word) => {
        setSelectedData(word);
        setOptions(filterOption(word));
        setShow(false)
        onChange(word);
    }

    const filterOption = (word) => {
        let newOptions = [...listArr];
        newOptions = newOptions.filter((e) => (e != word));
        return newOptions;
    }

    useEffect(() => {
        handleSelect(listArr[0]);
    }, [])

    return (
        <div className='w-[150px] flex flex-col bg-blue-600 rounded-lg capitalize relative'>

            <div className='w-full flex flex-col absolute top-10 left-0 bg-blue-800 rounded-lg'>
                {show && options.map((e, i) => (
                    <p key={i} onClick={() => handleSelect(e)} className='w-full px-4 py-2 capitalize'>{e}</p>
                ))}
            </div>

            <div onClick={() => setShow(!show)} className='flex gap-2 px-4 py-2 items-center'>
                <p className='w-full'>{selectedData}</p>
                {!show
                    ?
                    <MyImage className='w-[20px] h-[20px]' src={arrow} alt="icon" />
                    :
                    <MyImage className='w-[20px] h-[20px] rotate-180' src={arrow} alt="icon" />
                }
            </div>

        </div>
    )
}

export default DropDown
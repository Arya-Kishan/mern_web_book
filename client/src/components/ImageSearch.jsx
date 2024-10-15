import React, { useEffect, useState } from 'react'
import axios from "axios"
import MyImage from './MyImage'
import searchIcon from '../assets/icons/searchIcon.svg'
import MainSlider from './Slider/MainSlider'
import { toast } from 'react-toastify'
import Loader from './Loader'

const ImageSearch = ({ setValue, setSelectedFileUrl, setChooseToggle }) => {

    const [input, setInput] = useState("dog");
    const [images, setImages] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchImages = async () => {

        try {
            setLoading(true)
            let res = await axios(`https://api.unsplash.com/search/photos?query=${input}&per_Page=28&P=1&client_id=${"i-cJCQnO7I484JKFHfglJQUMUPBhPX2yI6lJS1tYmlU"}`);
            if (res.status !== 200) {
                toast("try again after few mins")
                return 1;
            }
            setImages(res.data.results);
            setLoading(false);
            setChooseToggle("link");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const handleImage = (image_url) => {
        console.log(image_url);
        setValue("file", image_url)
        setSelectedFileUrl(image_url)
        setShow(!show)
    }

    return (
        <div className='w-full h-full flex flex-col gap-5'>

            <MyImage className={"w-[20px] h-[20px]"} src={searchIcon} onClick={() => setShow(!show)} />

            <MainSlider show={show} setShow={setShow} height='50%'>
                <div className='w-full flex flex-col gap-5'>

                    {/* INPUT FOR SEARCH */}
                    <div className='w-full flex items-center justify-between bg-bgInput1 border-2 border-white rounded-lg overflow-hidden px-2'>
                        <input className='w-full bg-transparent p-2' type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Search...' />
                        <MyImage className={"w-[25px] h-[25px]"} src={searchIcon} onClick={fetchImages} />
                    </div>

                    {/* SHOWING IMAGES */}
                    {
                        loading
                            ?
                            <Loader />
                            :
                            <div className='w-full flex flex-wrap gap-4'>
                                {
                                    images?.map((e) => (
                                        <div key={e.id}>
                                            <MyImage className={"w-[200px] h-[200px]"} src={e.urls.regular} onClick={() => handleImage(e.urls.regular)} />
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </MainSlider>


        </div>
    )
}

export default ImageSearch
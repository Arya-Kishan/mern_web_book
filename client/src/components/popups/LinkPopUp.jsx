import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PopUp from '../common/PopUp'
import { useEditQuestionMutation } from '../../Redux/Question/QuestionApi'
import LoaderButton from '../Button/LoaderButton'

const LinkPopUp = ({ setShow, content }) => {

    const [youtube, setYoutube] = useState(content?.youtubeUrl)
    const [site, setSite] = useState(content?.websiteUrl)
    const [editQuestion, { isLoading: questionUpdating, isError: UpdatingError, isSuccess: UpdatingSuccess }] = useEditQuestionMutation();

    const handleLink = () => {
        setShow(false);
        editQuestion({ youtubeUrl: youtube, websiteUrl: site, id: content._id })
    }

    const handleVisit = (url) => {
        if (url) {
            var anchor = document.createElement('a');
            anchor.href = url;
            anchor.target = "_blank";
            anchor.click();
        } else {
            toast("NO URL FOUND");

        }


    }

    return (
        <PopUp setShow={setShow} height='50vh' >
            <p>Youtube</p>
            <div className='w-full flex justify-center'>
                <input className='w-[80%] text-gray-800 p-1 capitalize ' value={youtube} placeholder='Youtube Url' onChange={(e) => setYoutube(e.target.value)} type="text" />
                <div onClick={() => handleVisit(content?.youtubeUrl)} target='_blank' className='p-2 bg-yellow-500'>Visit</div>
            </div>
            <p>Website</p>
            <div className='w-full flex justify-center'>
                <input className='w-[80%] text-gray-800 p-1 capitalize ' value={site} placeholder='Site Url' onChange={(e) => setSite(e.target.value)} type="text" />
                <div onClick={() => handleVisit(content?.websiteUrlUrl)} target='_blank' className='p-2 bg-yellow-500'>Visit</div>
            </div>

            <LoaderButton text={"Add"} bgColor='bg-blue-800' loading={questionUpdating} onClick={handleLink} />


        </PopUp>
    )
}

export default LinkPopUp
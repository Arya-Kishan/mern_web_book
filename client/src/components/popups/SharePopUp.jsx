import React, { useState } from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton
} from "react-share";

import { EmailIcon, WhatsappIcon, FacebookIcon, LinkedinIcon } from 'react-share'
import { toast } from 'react-toastify';
import PopUp from '../common/PopUp';
import shareIcon from '../../assets/share.svg'
import MyImage from '../MyImage';

const SharePopUp = ({ link = "", imgClassName = "w-[20px] h-[20px]" }) => {

    const [showPopUp, setShowPopUp] = useState(false);

    let shareUrl = window.location.origin + link;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
        toast("copied")
    }
    return (
        <>

            <MyImage className={imgClassName} src={shareIcon} onClick={() => setShowPopUp(!showPopUp)} />

            <PopUp show={showPopUp} setShow={setShowPopUp} height='300px'>

                <div className='flex gap-4'>
                    <EmailShareButton url={shareUrl}>
                        <EmailIcon size={32} round={true} />
                    </EmailShareButton>

                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>

                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>

                    <LinkedinShareButton url={shareUrl}>
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                </div>

                <div className='w-[90%] flex gap-2 text-black bg-white items-center rounded-md'>
                    <p className='w-full p-2 text-[12px] text-ellipsis overflow-hidden'>{shareUrl}</p>
                    <button onClick={handleCopy} className='w-[100px] px-4 py-2 bg-blue-600 text-white'>copy</button>
                </div>
            </PopUp>

        </>
    )
}

export default SharePopUp
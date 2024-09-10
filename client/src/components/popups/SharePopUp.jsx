import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton
} from "react-share";

import { EmailIcon, WhatsappIcon, FacebookIcon, LinkedinIcon } from 'react-share'
import { toast } from 'react-toastify';
import PopUp from '../common/PopUp';

const SharePopUp = ({ setShow }) => {
    let shareUrl = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
        toast("copied")
    }
    return (
        <PopUp setShow={setShow} height='200px' >

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
    )
}

export default SharePopUp
import React, { useEffect } from 'react'
import PopUp from '../common/PopUp'
import { useAddGlobalMcqMutation } from '../../Redux/GlobalMcq/GlobalMcqApi';
import { useAddGlobalInterviewMutation } from '../../Redux/GlobalInterview/GlobalInterviewApi';
import LoaderButton from '../Button/LoaderButton';
import { toast } from 'react-toastify';

const MakeGlobalPopUp = ({ id, setShow, contentType, content = "", setPop = "" }) => {

    const [addGlobalMcq, { isLoading: mcqLoading, isError: mcqError, isSuccess: mcqSuccess }] = useAddGlobalMcqMutation();
    const [addGlobalInterview, { isLoading: interviewLoading, isError: interviewError, isSuccess: interviewSuccess }] = useAddGlobalInterviewMutation();


    const handleMakinGlobal = () => {

        if (content.isGlobal) {
            return toast("Already Global")
        }

        if (contentType == "mcqCard") {
            let newGlobal = { title: content.title, description: content.description, userId: content.userId, mcqId: content._id };
            addGlobalMcq(newGlobal);
        } else {
            let newGlobal = { title: content.title, description: content.description, userId: content.userId, interviewId: content._id };
            addGlobalInterview(newGlobal);
        }

    }

    useEffect(() => {
        if (mcqSuccess || interviewSuccess) {
            toast("Added to Global")
            setShow(false);
            setPop(false);
        }
    }, [mcqSuccess, interviewSuccess])

    return (
        <PopUp setShow={setShow} height='40vh'>

            <p className='capitalize text-[15px] text-center md:text-2xl font-semibold'>Are you sure to make it global</p>

            <div className='w-full flex justify-around mt-10'>
                <LoaderButton onClick={handleMakinGlobal} loading={mcqLoading || interviewLoading} text={"Yes"} bgColor='bg-green-500'>Yes</LoaderButton>
                <button onClick={() => { setShow(false); setPop(false) }} className='bg-blue-400 p-2 w-[50px] md:w-[100px] rounded-lg'>No</button>
            </div>

        </PopUp>
    )
}

export default MakeGlobalPopUp
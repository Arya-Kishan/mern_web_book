import React, { useEffect } from 'react'
import PopUp from '../common/PopUp'
import riskIcon from '../../assets/risk.svg'
import LoaderButton from '../Button/LoaderButton'
import { useDeleteTaskMutation } from '../../Redux/Task/TaskApi'
import { useDeleteNoteMutation } from '../../Redux/Note/NoteApi'
import { useDeleteInterviewMutation } from '../../Redux/Interview/InterviewApi'
import { useDeleteMcqMutation } from '../../Redux/Mcq/McqApi'
import Error from '../Error'
import { useDeleteQuestionMutation } from '../../Redux/Question/QuestionApi'
import { useDeleteOptionsMutation } from '../../Redux/Option/OptionApi'
import { useDeleteGlobalMcqMutation } from '../../Redux/GlobalMcq/GlobalMcqApi'
import { useDeleteGlobalInterviewMutation } from '../../Redux/GlobalInterview/GlobalInterviewApi'
import { toast } from 'react-toastify'

const DeletePopUp = ({ setShow, id, contentType = "", setPop = ()=>{} }) => {

    console.log(contentType);
    console.log(id);


    const [deleteTask, { isLoading: taskLoading, isError: taskError, isSuccess: taskSuccess }] = useDeleteTaskMutation();
    const [deleteNote, { isLoading: noteLoading, isError: noteError, isSuccess: noteSuccess }] = useDeleteNoteMutation();
    const [deleteInterview, { isLoading: InterviewLoading, isError: InterviewError, isSuccess: InterviewSuccess }] = useDeleteInterviewMutation();
    const [deleteMcq, { isLoading: mcqLoading, isError: mcqError, isSuccess: mcqSuccess }] = useDeleteMcqMutation();
    const [deleteQuestion, { isLoading: questionLoading, isError: questionError, isSuccess: questionSuccess }] = useDeleteQuestionMutation();
    const [deleteOptions, { isLoading: optionLoading, isError: optionError, isSuccess: optionSuccess }] = useDeleteOptionsMutation();
    const [deleteGlobalMcq, { isLoading: GlobalMcqLoading, isError: GlobalMcqError, isSuccess: GlobalMcqSuccess }] = useDeleteGlobalMcqMutation();
    const [deleteGlobalInterview, { isLoading: GlobalInterviewLoading, isError: GlobalInterviewError, isSuccess: GlobalInterviewSuccess }] = useDeleteGlobalInterviewMutation();

    const handleDelete = () => {
        console.log(id);
        if (contentType == "taskCard") {
            deleteTask(id);
        } else if (contentType == "noteCard") {
            deleteNote(id);
        } else if (contentType == "interviewCard") {
            deleteInterview(id);
        } else if (contentType == "mcqCard") {
            deleteMcq(id);
        } else if (contentType == "question") {
            deleteQuestion(id);
        } else if (contentType == "option") {
            deleteOptions(id);
        } else if (contentType == "globalMcq") {
            deleteGlobalMcq(id);
        } else if (contentType == "globalInterview") {
            deleteGlobalInterview(id);
        } else {
            console.log("nothing deleted");
        }
    }

    useEffect(() => {
        if (taskSuccess || noteSuccess || InterviewSuccess || mcqSuccess || optionSuccess || questionSuccess || GlobalMcqSuccess || GlobalInterviewSuccess) {
            toast("Deleted")
            setShow(false);
            setPop(false);
        }
    }, [taskSuccess, noteSuccess, InterviewSuccess, mcqSuccess, optionSuccess, questionSuccess, GlobalMcqSuccess, GlobalInterviewSuccess])

    if (taskError || noteError || mcqError || InterviewError || optionError || questionError) {
        return <Error />
    }

    return (
        <PopUp setShow={setShow} height='50vh' >
            <img src={riskIcon} alt="" srcSet="" />
            <p className='text-1xl sm:text-xl'>Are you sure to delete</p>
            <div className='w-full lg:w-[60%] flex justify-around gap-5 text-[13px] text-1xl'>
                <LoaderButton width='100px' text={"Delete"} loading={taskLoading || noteLoading || InterviewLoading || mcqLoading || optionLoading || questionLoading || GlobalMcqLoading || GlobalInterviewLoading} onClick={handleDelete} bgColor={"bg-red-600"} />
                <LoaderButton width='100px' text={"Cancel"} loading={false} onClick={() => { setShow(false); setPop(false) }} bgColor={"bg-green-600"} />
            </div>
        </PopUp>
    )
}

export default DeletePopUp
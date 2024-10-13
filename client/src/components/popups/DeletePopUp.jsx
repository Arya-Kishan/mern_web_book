import React, { useEffect } from 'react'
import PopUp from '../common/PopUp'
import riskIcon from '../../assets/risk.svg'
import LoaderButton from '../Button/LoaderButton'
import { useDeleteTaskMutation } from '../../Redux/Task/TaskApi'
import { useDeleteNoteMutation } from '../../Redux/Note/NoteApi'
import { useDeleteInterviewMutation } from '../../Redux/Interview/InterviewApi'
import { useDeleteMcqMutation } from '../../Redux/Mcq/McqApi'
import { useDeleteQuestionMutation } from '../../Redux/Question/QuestionApi'
import { useDeleteOptionsMutation } from '../../Redux/Option/OptionApi'
import { useDeleteGlobalMcqMutation } from '../../Redux/GlobalMcq/GlobalMcqApi'
import { useDeleteGlobalInterviewMutation } from '../../Redux/GlobalInterview/GlobalInterviewApi'
import MyImage from '../MyImage'
import { useDeletePostMutation } from '../../Redux/Post/postApi'

const DeletePopUp = ({ setShow, id, public_id = '', contentType = "", setPop = () => { } }) => {

    const [deleteTask, { isLoading: taskLoading, isSuccess: taskSuccess }] = useDeleteTaskMutation();
    const [deleteNote, { isLoading: noteLoading, isSuccess: noteSuccess }] = useDeleteNoteMutation();
    const [deleteInterview, { isLoading: InterviewLoading, isSuccess: InterviewSuccess }] = useDeleteInterviewMutation();
    const [deleteMcq, { isLoading: mcqLoading, isSuccess: mcqSuccess }] = useDeleteMcqMutation();
    const [deleteQuestion, { isLoading: questionLoading, isSuccess: questionSuccess }] = useDeleteQuestionMutation();
    const [deleteOptions, { isLoading: optionLoading, isSuccess: optionSuccess }] = useDeleteOptionsMutation();
    const [deleteGlobalMcq, { isLoading: GlobalMcqLoading, isSuccess: GlobalMcqSuccess }] = useDeleteGlobalMcqMutation();
    const [deleteGlobalInterview, { isLoading: GlobalInterviewLoading, isSuccess: GlobalInterviewSuccess }] = useDeleteGlobalInterviewMutation();
    const [deletePost, { isLoading: postLoading, isSuccess: postSuccess }] = useDeletePostMutation();

    const handleDelete = () => {
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
        } else if (contentType == "postCard") {
            deletePost({ postId: id, public_id: public_id });
        } else {
            console.log("nothing deleted");
        }
    }

    useEffect(() => {
        if (taskSuccess || noteSuccess || InterviewSuccess || mcqSuccess || optionSuccess || questionSuccess || GlobalMcqSuccess || GlobalInterviewSuccess || postSuccess) {
            setShow(false);
            setPop(false);
        }
    }, [taskSuccess, noteSuccess, InterviewSuccess, mcqSuccess, optionSuccess, questionSuccess, GlobalMcqSuccess, GlobalInterviewSuccess, postSuccess])

    return (
        <PopUp setShow={setShow} height='50vh' >
            <MyImage src={riskIcon} className={"w-[90px] h-[90px]"} alt='riskIcon' />
            <p className='text-1xl sm:text-xl'>Are you sure to delete</p>
            <div className='w-full lg:w-[60%] flex justify-around gap-5 text-[13px] text-1xl'>
                <LoaderButton width='100px' text={"Delete"} loading={taskLoading || noteLoading || InterviewLoading || mcqLoading || optionLoading || questionLoading || GlobalMcqLoading || GlobalInterviewLoading || postLoading} onClick={handleDelete} bgColor={"bg-red-600"} />
                <LoaderButton width='100px' text={"Cancel"} loading={false} onClick={() => { setShow(false); setPop(false) }} bgColor={"bg-green-600"} />
            </div>
        </PopUp>
    )
}

export default DeletePopUp
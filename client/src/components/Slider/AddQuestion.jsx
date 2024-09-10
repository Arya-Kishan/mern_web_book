import React, { useEffect, useState } from 'react'
import cancelIcon from '../../assets/cancel.svg'
import { useForm } from 'react-hook-form';
import LoaderButton from '../Button/LoaderButton';
import { useAddQuestionMutation, useEditQuestionMutation, useGetQuestionQuery } from '../../Redux/Question/QuestionApi';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/Auth/AuthSlice';

const AddQuestion = ({ show, setShow, interviewId, type = "create" }) => {

    const [slide, setSlide] = useState("top-full");
    const [show1, setShow1] = useState(false)
    const [fetch, setFetch] = useState(true)
    const userId = useSelector(selectUserId)


    const [addQuestion, { isLoading: questionAdding, isError: questionError, isSuccess: questionSuccess }] = useAddQuestionMutation();
    const [editQuestion, { isLoading: questionUpdating, isError: UpdatingError, isSuccess: UpdatingSuccess }] = useEditQuestionMutation();
    const { data: singleQuestion, isLoading } = useGetQuestionQuery(interviewId, { skip: fetch });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        if (type == "create") {
            let newQuesion = { ...data, userId: userId, interviewId: interviewId };
            addQuestion(newQuesion)
        } else {
            let updatedQuesion = { ...data, userId: userId, id: singleQuestion._id };
            editQuestion(updatedQuesion)
        }
    }


    useEffect(() => {

        if (show) {
            setShow1(true)
            setTimeout(() => {
                setSlide("top-0")
            }, 100);
        } else {
            setSlide("top-full")
            setTimeout(() => {
                setShow1(false)
            }, 500);
        }

    }, [show])

    useEffect(() => {
        if (type = "update") {
            setFetch(false)
        } else {
            setFetch(true)
        }
    }, [type])

    useEffect(() => {

        if (singleQuestion) {
            setValue("question", singleQuestion.question)
            setValue("answer", singleQuestion.answer)
        }

    }, [singleQuestion])

    useEffect(() => {
        if (questionSuccess || UpdatingSuccess) {
            setShow(false)
        }
    }, [questionSuccess, UpdatingSuccess])

    if (questionError || UpdatingError) {
        return <Error />
    }


    return (
        show1 && <div className={`w-full h-full transition-all duration-500 absolute ${slide} left-0 bg-black/[0.9] sliderShadow`}>

            <div onClick={() => setShow(false)} className='w-full p-2 flex justify-center items-center'><img src={cancelIcon} alt="" /></div>

            <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

                <p>Question</p>
                <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('question', { required: true })} placeholder='Question...' />
                {errors.question && <p className='text-red-600'>Question is required.</p>}

                <p>Answer</p>
                <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('answer', { required: true })} placeholder='Answer...' />
                {errors.answer && <p className='text-red-600'>Answer is required.</p>}

                <div className='flex items-center justify-around mt-5'>
                    <LoaderButton text={type} loading={questionAdding || questionUpdating} />
                    <button type='button' onClick={() => setShow(false)} className='w-[100px] h-fit px-4 py-2 flex items-center justify-center capitalize bg-blue-700 shadow-md rounded-lg' >Cancel</button>
                </div>

            </form>

        </div>
    )
}

export default AddQuestion
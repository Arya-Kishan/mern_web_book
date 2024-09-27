import React, { useEffect, useState } from 'react'
import cancelIcon from '../../assets/cancel.svg'
import { useForm } from 'react-hook-form';
import LoaderButton from '../Button/LoaderButton';
import { useSelector } from 'react-redux';
import { useAddOptionsMutation, useEditOptionsMutation, useGetOptionQuery } from '../../Redux/Option/OptionApi';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import MyImage from '../MyImage';

const AddOption = ({ show, setShow, mcqId, optionId = "", type = "create" }) => {

    const [slide, setSlide] = useState("top-full");
    const [show1, setShow1] = useState(false)
    const [fetch, setFetch] = useState(true)
    const userId = useSelector(selectUserId)


    const [addOptions, { isLoading: optionAdding, isError: optionError, error: optionErrorData, isSuccess: optionSuccess }] = useAddOptionsMutation();
    const [editOptions, { isLoading: optionUpdating, isError: UpdatingError, error: UpdatingErrorData, isSuccess: UpdatingSuccess }] = useEditOptionsMutation();
    const { data: singleOption, isLoading, error } = useGetOptionQuery(optionId, { skip: fetch });


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {

        data.question = data.question.split("\n").join("<br>");

        let doc = { question: data.question, answer: data.answer, options: [data.option1, data.option2, data.option3, data.option4], userId: userId, mcqId: mcqId };

        if (type == "create") {
            addOptions(doc);
        } else {
            let updatedOption = { ...doc, id: singleOption._id };
            editOptions(updatedOption)
        }
    }


    // BELOW USEEFFECT USED FOR SLIDER PURPOSE
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
        if (type == "update") {
            setFetch(false)
        } else {
            setFetch(true)
        }
    }, [type])

    useEffect(() => {

        if (singleOption) {
            setValue("question", singleOption.question)
            setValue("answer", singleOption.answer)
            setValue("option1", singleOption.options[0])
            setValue("option2", singleOption.options[1])
            setValue("option3", singleOption.options[2])
            setValue("option4", singleOption.options[3])
        }

    }, [singleOption])

    useEffect(() => {
        if (optionSuccess || UpdatingSuccess) {
            setShow(false)
        }
    }, [optionSuccess, UpdatingSuccess])

    if (optionError || UpdatingError || error) {
        return <Error text={`Error in ${type} Question`} errorResponse={optionErrorData || UpdatingErrorData || error} />
    }


    return (
        show1 && <div className={`w-full h-full transition-all duration-500 absolute ${slide} left-0 bg-black/[0.9] sliderShadow`}>

            <div onClick={() => setShow(false)} className='w-full p-2 flex justify-center items-center'>
                <MyImage className={"w-[60px] h-[60px]"} src={cancelIcon} alt="" />
            </div>

            <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

                <p>Question</p>
                <textarea className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('question', { required: true })} placeholder='Question...' />
                {errors.question && <p className='text-red-600'>Question is required.</p>}

                <div className='w-full flex justify-between gap-4'>

                    <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('option1', { required: true })} placeholder='Option1...' />
                    {errors.Option1 && <p className='text-red-600'>Option1 is required.</p>}

                    <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('option2', { required: true })} placeholder='Option2...' />
                    {errors.Option2 && <p className='text-red-600'>Option2 is required.</p>}

                </div>

                <div className='w-full flex gap-4 justify-between'>

                    <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('option3', { required: true })} placeholder='Option3...' />
                    {errors.Option3 && <p className='text-red-600'>Option3 is required.</p>}

                    <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('option4', { required: true })} placeholder='Option4...' />
                    {errors.Option4 && <p className='text-red-600'>Option4 is required.</p>}

                </div>

                <p>Answer</p>
                <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('answer', { required: true })} placeholder='Answer...' />
                {errors.Answer && <p className='text-red-600'>Answer is required.</p>}

                <div className='flex items-center justify-around mt-5'>
                    <LoaderButton text={type} loading={optionAdding || optionUpdating} />
                    <button type='button' onClick={() => setShow(false)} className='w-[100px] h-fit px-4 py-2 flex items-center justify-center capitalize bg-blue-700 shadow-md rounded-lg' >Cancel</button>
                </div>

                <button type='button' onClick={() => reset()} className='w-full h-fit px-4 py-2 flex items-center justify-center capitalize bg-white/[0.3] shadow-md rounded-lg' >Clear</button>


            </form>

        </div>
    )
}

export default AddOption
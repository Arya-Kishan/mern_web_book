import React, { lazy, Suspense, useState } from 'react'
import OptionButton from '../../components/OptionButton';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
const AddOption = lazy(() => import("../../components/Slider/AddOption"))

import { useParams, useSearchParams } from 'react-router-dom';
import addIcon from '../../assets/add.svg'
import { useGetAllOptionsQuery } from '../../Redux/Option/OptionApi';

import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import DeletePopUp from '../../components/popups/DeletePopUp';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import MyImage from '../../components/MyImage';

// just give noteId then you will get all options of related course
const McqDetailPage = () => {

    const { mcqId } = useParams();
    const [searchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    const [slide, setSlide] = useState(false);
    const [type, setType] = useState("create");
    const [optionId, setOptionId] = useState("");
    const userId = useSelector(selectUserId)

    const { data: options, isLoading, isError, error } = useGetAllOptionsQuery(mcqId);

    const handleDelete = (id) => {
        setOptionId(id);
        setShow(true);
    }

    const handleEdit = (id) => {
        setSlide(true);
        setType("update");
        setOptionId(id);
    }


    if (isError) {
        return <Error text='Error Occured' errorResponse={error} />
    }

    return (
        <div className='w-full h-full flex flex-col gap-2 relative'>

            <div className='w-full h-[40px] flex items-center justify-between gap-2'>
                <p className='font-semibold text-xl capitalize'>{searchParams.get("title")}</p>
                {/* USED BELOW OPTIONAL TO HIDE ADD BUTTON */}
                {
                    options?.length > 0
                        ?
                        userId == options[0]?.userId && <MyImage onClick={() => { setSlide(true); setType("create") }} className='w-[30px] h-[30px]' src={addIcon} alt="add" />
                        :
                        <MyImage onClick={() => { setSlide(true); setType("create") }} className='w-[30px] h-[30px]' src={addIcon} alt="add" />
                }
            </div>

            <div className='w-full h-[calc(100%-40px)] flex flex-col gap-[50px] overflow-scroll'>

                {isLoading
                    ?
                    <Loader />
                    :
                    options?.length > 0
                        ?
                        options?.map((e) => (
                            <div key={e._id} className='flex flex-col gap-2'>

                                <div className='w-full flex flex-col justify-between gap-2  overflow-hidden p-2'>


                                    <div className='flex w-full gap-2'>
                                        <span>Q)</span>
                                        <p className='text-1xl capitalize w-full' dangerouslySetInnerHTML={{ __html: e.question }} ></p>
                                    </div>

                                    {userId == e.userId && <p className='flex gap-2 items-center justify-end'>
                                        <MyImage className='w-[20px] h-[20px]' onClick={() => handleDelete(e._id)} src={deleteIcon} alt="delete" />
                                        <MyImage className='w-[20px] h-[20px]' onClick={() => handleEdit(e._id)} src={editIcon} alt="edit" />
                                    </p>}

                                </div>

                                <div className='flex flex-col gap-2'>
                                    <OptionButton optionsArr={e.options} answer={e.answer} />
                                </div>

                            </div>
                        ))
                        :
                        <div className='w-full h-full flex justify-center items-center'>NO MCQ's</div>}

            </div>

            {/* SLIDER TO ADD QUESTIONS */}
            <Suspense fallback="">
                {slide && <AddOption show={slide} setShow={setSlide} mcqId={mcqId} optionId={optionId} type={type} />}
                {show && <DeletePopUp setShow={setShow} id={optionId} contentType='option' />}
            </Suspense>


        </div>
    )
}

export default McqDetailPage
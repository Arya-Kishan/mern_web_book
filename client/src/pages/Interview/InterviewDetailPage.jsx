import React, { lazy, Suspense, useState } from 'react'
import Accordion from '../../components/Accordion';
import { useParams, useSearchParams } from "react-router-dom"
import Loader from '../../components/Loader';
import { useGetAllQuestionsQuery } from '../../Redux/Question/QuestionApi';
import Error from '../../components/Error';
import addIcon from '../../assets/add.svg'
const AddQuestion = lazy(() => import("../../components/Slider/AddQuestion"))


const InterviewDetailPage = () => {

    const { interviewId } = useParams();
    const [searchParams] = useSearchParams()
    const [slide, setSlide] = useState(false);

    const { data: questions, isLoading, isError, error } = useGetAllQuestionsQuery(interviewId);

    if (isError) {
        return <Error text='Error Occured' errorResponse={error} />
    }


    return (
        <div className='w-full h-full relative'>

            <div className='w-full h-[40px] flex items-center justify-between gap-2'>
                <p className='font-semibold text-xl capitalize'>{searchParams.get("title")}</p>
                <img onClick={() => setSlide(true)} className='w-[30px] h-[30px]' src={addIcon} alt="add" srcSet="" />
            </div>

            <div className='w-full h-[calc(100%-40px)] overflow-scroll'>
                {isLoading
                    ?
                    <Loader />
                    :
                    questions?.length < 1
                        ?
                        <div className='w-full h-full flex justify-center items-center'>NO QUESTIONS</div>
                        :
                        questions?.map((e, i) => (
                            <Accordion key={i} content={e} />
                        ))
                }
            </div>

            {/* SLIDER TO ADD QUESTIONS */}
            <Suspense fallback="">
                {slide && <AddQuestion show={slide} setShow={setSlide} interviewId={interviewId} type={"create"}></AddQuestion>}
            </Suspense>

        </div>
    )
}

export default InterviewDetailPage
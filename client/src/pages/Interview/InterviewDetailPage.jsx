import React, { lazy, Suspense, useState } from 'react'
import Accordion from '../../components/Accordion';
import { useParams, useSearchParams } from "react-router-dom"
import Loader from '../../components/Loader';
import { useGetAllQuestionsQuery } from '../../Redux/Question/QuestionApi';
import Error from '../../components/Error';
import addIcon from '../../assets/add.svg'
const AddQuestion = lazy(() => import("../../components/Slider/AddQuestion"))


const InterviewDetailPage = () => {

    const data = [
        {
            "_id": "66c89e09361e81b07bba1dc6",
            "question": "what is React JS",
            "answer": "React JS is a library used for making interfaces",
            "noteId": "66c89cde28bfce7fca557e50",
            "createdAt": "2024-08-23T14:34:49.473Z",
            "updatedAt": "2024-08-23T14:34:49.473Z",
            "userId": "66cdf53aa18b6bb011b9265b",
            "__v": 0
        },
        {
            "_id": "66c89e25361e81b07bba1dc8",
            "question": "what is useState",
            "answer": "useState is a react hooks used for declaring a state to a component",
            "noteId": "66c89cde28bfce7fca557e50",
            "createdAt": "2024-08-23T14:35:17.088Z",
            "updatedAt": "2024-08-23T14:35:17.088Z",
            "userId": "66cdf53aa18b6bb011b9265b",
            "__v": 0
        },
        {
            "_id": "66c89e41361e81b07bba1dca",
            "question": "what is useEffect",
            "answer": "useEffct is a react hooks used for life cycle methods in to a component",
            "noteId": "66c89cde28bfce7fca557e50",
            "createdAt": "2024-08-23T14:35:45.586Z",
            "updatedAt": "2024-08-25T07:45:30.708Z",
            "userId": "66cdf53aa18b6bb011b9265b",
            "__v": 0
        },
        {
            "_id": "66c89e60361e81b07bba1dcc",
            "question": "what is Virtual DOM",
            "answer": "Virtual DOM is a virtua lrepresentaion of real DOM",
            "noteId": "66c89cde28bfce7fca557e50",
            "createdAt": "2024-08-23T14:36:16.994Z",
            "updatedAt": "2024-08-23T14:36:16.994Z",
            "userId": "66cdf53aa18b6bb011b9265b",
            "__v": 0
        }
    ]

    const { interviewId } = useParams();
    const [searchParams] = useSearchParams()
    const [slide, setSlide] = useState(false);


    const { data: questions, isLoading, isError } = useGetAllQuestionsQuery(interviewId);

    if (isError) {
        return <Error />
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
                    questions?.length < 0
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
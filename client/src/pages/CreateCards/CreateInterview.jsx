import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import LoaderButton from '../../components/Button/LoaderButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { useAddInterviewMutation, useEditInterviewMutation, useGetInterviewQuery } from '../../Redux/Interview/InterviewApi';

// Used for both creating nad updating question cards
const CreateInterview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const userId = useSelector(selectUserId);

  const [fetch, setFetch] = useState(true);

  const navigate = useNavigate();
  const { data: interview, error } = useGetInterviewQuery(searchParams.get("interviewId"), { skip: fetch });

  const [addInterview, { isLoading: isInterviewCreating, isError: isInterviewCreatingError, error: isInterviewCreatingErrorData, isSuccess: isInterviewCreatingSuccess }] = useAddInterviewMutation();
  const [editInterview, { isLoading: isInterviewUpdating, isError: isInterviewUpdatingError, error: isInterviewUpdatingErrorData, isSuccess: isInterviewUpdatingSuccess }] = useEditInterviewMutation();


  const onSubmit = (data) => {

    if (searchParams.get("type") == "update") {
      let updatedInterview = { userId: userId, ...data, id: interview._id }
      editInterview(updatedInterview);
    } else {
      let newInterview = { userId: userId, ...data }
      addInterview(newInterview);
    }

  }

  useEffect(() => {
    if (searchParams.get("type") == "update") {
      setFetch(false);
    }
  }, [searchParams.get("type")])


  useEffect(() => {
    if (isInterviewCreatingSuccess || isInterviewUpdatingSuccess) {
      navigate("/home/interview")
    }
  }, [isInterviewCreatingSuccess, isInterviewUpdatingSuccess])


  useEffect(() => {
    if (interview) {
      setValue("title", interview.title)
      setValue("description", interview.description)
    }
  }, [interview])

  if (isInterviewCreatingError || isInterviewUpdatingError || error) {
    return <Error text={`Error in ${searchParams.get("type")} Interview`} errorResponse={isInterviewCreatingErrorData || isInterviewUpdatingErrorData || error} />
  }

  return (
    <div className='flex flex-col gap-5'>

      <p className='text-2xl font-semibold capitalize'>{searchParams.get("type")} Question</p>

      {/* FORM FOR CREATING QUESTION CARD */}
      <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

        <p>Title</p>
        <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('title', { required: true })} placeholder='Title...' />
        {errors.title && <p className='text-red-600'>title is required.</p>}

        <p>Description</p>
        <textarea className='h-[200px] p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('description', { required: true })} placeholder='Description...' />
        {errors.description && <p className='text-red-600'>description is required.</p>}

        <div className='flex justify-center items-center mt-10'>
          <LoaderButton width={'200px'} text={searchParams.get("type")} loading={isInterviewCreating || isInterviewUpdating} />
        </div>

      </form>



    </div>
  )
}

export default CreateInterview
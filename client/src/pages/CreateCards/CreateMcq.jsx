import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import LoaderButton from '../../components/Button/LoaderButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { useAddMcqMutation, useEditMcqMutation, useGetMcqQuery } from '../../Redux/Mcq/McqApi';
import Error from '../../components/Error';

const CreateMcq = () => {
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
  const { data: Mcq, error } = useGetMcqQuery(searchParams.get("mcqId"), { skip: fetch });

  const [addMcq, { isLoading: isMcqCreating, isError: isMcqCreatingError, error: isMcqCreatingErrorData, isSuccess: isMcqCreatingSuccess }] = useAddMcqMutation();
  const [editMcq, { isLoading: isMcqUpdating, isError: isMcqUpdatingError, error: isMcqUpdatingErrorData, isSuccess: isMcqUpdatingSuccess }] = useEditMcqMutation();


  const onSubmit = (data) => {

    if (searchParams.get("type") == "update") {
      let updatedMcq = { userId: userId, ...data, id: Mcq._id }
      editMcq(updatedMcq);
    } else {
      let newMcq = { userId: userId, ...data }
      addMcq(newMcq);
    }

  }

  useEffect(() => {
    if (searchParams.get("type") == "update") {
      setFetch(false);
    }
  }, [searchParams.get("type")])


  useEffect(() => {
    if (isMcqCreatingSuccess || isMcqUpdatingSuccess) {
      navigate("/home/mcq")
    }
  }, [isMcqCreatingSuccess, isMcqUpdatingSuccess])


  useEffect(() => {
    if (Mcq) {
      setValue("title", Mcq.title)
      setValue("description", Mcq.description)
    }
  }, [Mcq])

  if (isMcqCreatingError || isMcqUpdatingError || error) {
    return <Error text={`Error in ${searchParams.get("type")} Mcq`} errorResponse={isMcqCreatingErrorData || isMcqUpdatingErrorData || error} />
  }

  return (
    <div className='flex flex-col gap-5'>

      <p className='text-2xl font-semibold capitalize'>{searchParams.get("type")} Mcq</p>

      {/* FORM FOR CREATING QUESTION CARD */}
      <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

        <p>Title</p>
        <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('title', { required: true })} placeholder='Title...' />
        {errors.title && <p className='text-red-600'>title is required.</p>}

        <p>Description</p>
        <textarea className='h-[200px] p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('description', { required: true })} placeholder='Description...' />
        {errors.description && <p className='text-red-600'>description is required.</p>}

        <div className='flex justify-center items-center mt-10'>
          <LoaderButton width={'200px'} text={searchParams.get("type")} loading={isMcqCreating || isMcqUpdating} />
        </div>

      </form>



    </div>
  )
}

export default CreateMcq
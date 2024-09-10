import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import LoaderButton from '../../components/Button/LoaderButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useAddNoteMutation, useEditNoteMutation, useGetNoteQuery } from '../../Redux/Note/NoteApi';
import Error from '../../components/Error';

const CreateNote = () => {
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
  const { data: note } = useGetNoteQuery(searchParams.get("noteId"), { skip: fetch });

  const [addNote, { isLoading: isNoteCreating, isError: isNoteCreatingError, isSuccess: isNoteCreatingSuccess }] = useAddNoteMutation();
  const [editNote, { isLoading: isNoteUpdating, isError: isNoteUpdatingError, isSuccess: isNoteUpdatingSuccess }] = useEditNoteMutation();


  const onSubmit = (data) => {

    if (searchParams.get("type") == "update") {
      let updatedNote = { userId: userId, ...data, id: note._id }
      editNote(updatedNote);
    } else {
      let newNote = { userId: userId, ...data }
      addNote(newNote);
    }

  }

  useEffect(() => {
    if (searchParams.get("type") == "update") {
      setFetch(false);
    }
  }, [searchParams.get("type")])


  useEffect(() => {
    if (isNoteCreatingSuccess || isNoteUpdatingSuccess) {
      navigate("/notes")
    }
  }, [isNoteCreatingSuccess, isNoteUpdatingSuccess])


  useEffect(() => {
    if (note) {
      setValue("title", note.title)
      setValue("description", note.description)
    }
  }, [note])

  if (isNoteCreatingError || isNoteUpdatingError) {
    return <Error />
  }

  return (
    <div className='flex flex-col gap-5'>

      <p className='text-2xl font-semibold capitalize'>{searchParams.get("type")} Note</p>

      <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

        <p>Title</p>
        <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('title', { required: true })} placeholder='Title...' />
        {errors.title && <p className='text-red-600'>title is required.</p>}

        <p>Description</p>
        <textarea className='h-[200px] p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('description', { required: true })} placeholder='Description...' />
        {errors.description && <p className='text-red-600'>description is required.</p>}

        <div className='flex justify-center items-center mt-10'><LoaderButton width={'200px'} text={searchParams.get("type")} loading={isNoteCreating || isNoteUpdating} /></div>

      </form>



    </div>
  )
}

export default CreateNote
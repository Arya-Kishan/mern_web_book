import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import LoaderButton from '../../components/Button/LoaderButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { useAddTaskMutation, useEditTaskMutation, useGetTaskQuery } from '../../Redux/Task/TaskApi';

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [fetchTask, setFetchTask] = useState(true);
  const [reminder, setRemider] = useState(false);
  const dateRef = useRef();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const { data: task } = useGetTaskQuery(searchParams.get("taskId"), { skip: fetchTask });

  const [addTask, { isLoading: isTaskCreating, isError: isTaskCreatingError, isSuccess: isTaskCreatingSuccess }] = useAddTaskMutation();
  const [editTask, { isLoading: isTaskUpdating, isError: isTaskUpdatingError, isSuccess: isTaskUpdatingSuccess }] = useEditTaskMutation();


  const onSubmit = (data) => {

    if (!reminder) {
      console.log("arya");
      delete data.reminder;
    }
    console.log(data);

    if (searchParams.get("type") == "update") {
      let updatedTask = { userId: userId, ...data, id: task._id }
      editTask(updatedTask);
    } else {
      let newTask = { userId: userId, ...data }
      addTask(newTask);
    }

  }

  useEffect(() => {
    if (searchParams.get("type") == "update") {
      setFetchTask(false);
    }
  }, [searchParams.get("type")])


  useEffect(() => {
    if (isTaskCreatingSuccess || isTaskUpdatingSuccess) {
      navigate("/tasks")
    }
  }, [isTaskCreatingSuccess, isTaskUpdatingSuccess])


  useEffect(() => {
    if (task) {
      setValue("title", task.title)
      setValue("description", task.description)
      setValue("condition", task.condition)
    }
  }, [task])

  return (
    <div className='flex flex-col gap-5'>

      <p className='text-2xl font-semibold capitalize'>{searchParams.get("type")} Task</p>

      <form className='w-full lg:w-[80%] sm:w-full flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

        <p>Title</p>
        <input className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('title', { required: true })} placeholder='Title...' />
        {errors.title && <p className='text-red-600'>title is required.</p>}

        <p>Description</p>
        <textarea className='h-[200px] p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('description', { required: true })} placeholder='Description...' />
        {errors.description && <p className='text-red-600'>description is required.</p>}

        {/* conditons */}
        <div className='border-white border-2 rounded-lg'>
          <select name="" id="" {...register('condition')} className='p-2 bg-bgInput1 rounded-xl w-full outline-none border-white'>
            <option value="incompleted">Incompleted</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* reminder */}
        <div className='flex flex-col gap-4'>

          <div className='flex gap-5 items-center'>
            <input type="checkbox" value={reminder} onChange={() => setRemider(!reminder)} />
            <p>Need a reminder</p>
          </div>

          <div>
            {reminder &&
              <input type='date' min={new Date().toISOString().split("T")[0]} defaultChecked={"yyyy-mm-dd"} ref={dateRef} className='p-2 bg-bgInput1 rounded-xl w-full border-2 border-white' {...register('reminder', { required: false })} placeholder='Date Reminder...' />}
          </div>
        </div>


        <div className='flex justify-center items-center mt-10'>
          <LoaderButton width={'200px'} text={searchParams.get("type")} loading={isTaskCreating || isTaskUpdating} />
        </div>

      </form>



    </div>
  )
}

export default CreateTask
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import deleteIcon from '../../assets/delete.svg'
import checkIcon from '../../assets/check.svg'
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/Auth/AuthSlice';
import { useAddDocumentMutation, useEditDocumentMutation, useGetDocumentQuery } from '../../Redux/Document/DocumentApi';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import MyImage from '../../components/MyImage';

const NoteDetailPage = () => {
  const [searchParams] = useSearchParams();
  const [text, setText] = useState("Welcome my Lord Edit me ....😊");
  const { noteId } = useParams();
  const userId = useSelector(selectUserId)

  const { data: documents, isLoading: docLoading, isError: docError, error: docErrorData, } = useGetDocumentQuery(noteId);
  const [editDocument, { isLoading: docUpdating, isError: docUpdatingError, error: docUpdatingErrorData, isSuccess: docUpdatingSuccess }] = useEditDocumentMutation();
  const [addDocument, { isLoading: docAdding, isError: docAddingError, error: docAddingErrorData, isSuccess: docAddingSuccess }] = useAddDocumentMutation();

  const handleUpdate = () => {

    if (documents.length > 0) {
      const newDoc = { id: documents[0]._id, document: text, userId: userId, noteId: noteId };
      editDocument(newDoc)
    } else {
      const newDoc = { document: text, userId: userId, noteId: noteId };
      addDocument(newDoc)
    }

  }

  const handleDelete = () => {

  }

  useEffect(() => {
    if (documents && documents.length > 0) {
      setText(documents[0].document)
    }
  }, [documents])

  if (docError || docUpdatingError || docAddingError) {
    return <Error text={`Error Occured`} errorResponse={docErrorData || docUpdatingErrorData || docAddingErrorData} />
  }

  return (
    <div className='w-full h-full'>

      <div className='w-full h-[40px] border-b-4 flex items-center justify-between'>

        <p className='font-bold text-xl'>{searchParams.get("title")}</p>

        <div className='flex gap-2 items-center pr-4'>
          {docUpdating || docAdding
            ?
            <div className='w-[25px] h-[25px]'><Loader loaderSize={20} /></div>
            :
            <MyImage onClick={handleUpdate} className='w-[25px] h-[25px]' src={checkIcon} alt="icon" />
          }
          <MyImage onClick={handleDelete} className='w-[25px] h-[25px]' src={deleteIcon} alt="icon" />
        </div>

      </div>

      <div className='w-full h-[calc(100%-40px)]'>
        {docLoading
          ?
          <div className='w-full h-full flex justify-center items-center'>Getting...</div>
          :
          <textarea name="" id="" className='w-full h-[calc(100%-40px)] bg-transparent border-none outline-none' value={text} onChange={(e) => { setText(e.target.value) }}></textarea>
        }
      </div>

    </div>
  )
}

export default NoteDetailPage
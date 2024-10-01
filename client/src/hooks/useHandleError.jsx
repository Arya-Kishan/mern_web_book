import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUserId } from '../Redux/Auth/AuthSlice';
import { useAddErrorMutation } from '../Redux/Error/ErrorApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useHandleError = () => {
    const userId = useSelector(selectUserId);
    const navigate = useNavigate();
    const [addError, { isLoading, isError, isSuccess, error }] = useAddErrorMutation();

    const handleApiError = (getQuery = false, addQuery = false, updateQuery = false, deleteQuery = false, error = "", errorMessage = "", errorInComponent = "") => {
        console.log("getQuery : " + getQuery);
        console.log("addQuery : " + addQuery);
        console.log("updateQuery : " + updateQuery);
        console.log("deleteQuery : " + deleteQuery);
        console.log("Error Data : ");
        console.log(error);
        if (getQuery) {
            navigate("/home/error")
        } else {
            toast("error occured")
        }

        handleError(`API Error : ${error?.data?.message}`, errorMessage, errorInComponent, "frontend");
        return 0;
    }

    const handleError = (error = "", errorMessage = "", errorInComponent = "", errorFrom = "frontend") => {
        let errorData = { error, errorMessage, errorInComponent, errorFrom };
        console.log(errorData);
        addError(errorData)
    }

    if (isError) {
        console.log("ERROR DOESN'T SAVED IN DATABSE");
    }

    useEffect(() => {
        console.log(error);
    }, [isError])

    return ({ handleError, handleApiError })
}

export default useHandleError
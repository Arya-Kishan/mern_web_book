import React from 'react'
import { useSelector } from 'react-redux'
// import { selectLoggedInUser } from '../Redux/AuthSlice'
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../Redux/Auth/AuthSlice';

const ProtectedPage = ({ children }) => {

    const loggedInUser = useSelector(selectLoggedInUser);

    if (loggedInUser == null) {
        return <Navigate to={'/login'} />
    }

    return children;
}

export default ProtectedPage
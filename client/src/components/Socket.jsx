import React, { useEffect } from 'react'
import { io } from "socket.io-client"
import { selectLoggedInUser } from '../Redux/Auth/AuthSlice';
import { useSelector } from 'react-redux';

export let globalSocket = null;

const Socket = () => {

    const loggedInUser = useSelector(selectLoggedInUser)

    useEffect(() => {

        if (loggedInUser) {

            globalSocket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
                query: {
                    userId: loggedInUser._id,
                }
            });

            globalSocket.on("connect", () => {
                console.log("connected to socket");
            })


        }

        return () => {
            // globalSocket?.disconnect();
        }

    }, [loggedInUser])

    return ""
}

export default Socket
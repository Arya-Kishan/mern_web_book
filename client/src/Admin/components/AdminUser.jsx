import React from 'react'
import { useGetAllUsersQuery } from '../AdminApi';
import dayjs from 'dayjs'


const AdminUser = () => {

    const { data } = useGetAllUsersQuery();
    console.log(data);


    return (
        <div className='w-full h-[calc(100vh-40px)]'>

            <div className='w-full h-[30px] flex justify-between font-bold text-white p-2'>
                <p className='text-[16px] '>User List</p>
                <p>Total : {data?.length}</p>
            </div>


            <div className='w-full h-[calc(100vh-70px)] flex flex-col items-center gap-3 py-2 overflow-scroll'>
                {data
                    ?
                    data.length < 1
                        ?
                        <div className='w-full h-full flex justify-center items-center'>NO ERRORS</div>
                        :
                        data.map((e) => (
                            <div key={e._id} className='w-[90%] min-h-[150px] h-fit flex flex-col justify-between bg-bg-card p-2 text-white'>

                                <p>Name : {e.name}</p>
                                <p>Email : {e.email}</p>
                                <p>Role : {e.role}</p>
                                <p>Created At : {dayjs(e.createdAt).format("DD/MM/YY")}</p>

                            </div>
                        ))
                    :
                    "Loading..."
                }
            </div>

        </div>
    )
}

export default AdminUser
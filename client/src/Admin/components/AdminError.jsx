import React from 'react'
import { useGetAllErrorQuery } from '../AdminApi';
import dayjs from 'dayjs'

const AdminError = () => {

    const { data } = useGetAllErrorQuery();

    return (
        <div className='w-full h-[calc(100vh-40px)]'>

            <div className='w-full h-[30px] flex justify-between font-bold text-white px-2'>
                <p className='text-[16px] '>Error List</p>
                <p>Total : {data?.length}</p>
            </div>


            <div className='w-full h-[calc(100vh-70px)] flex flex-col items-center gap-6 overflow-scroll'>
                {data
                    ?
                    data.length < 1
                        ?
                        <div className='w-full h-full flex justify-center items-center'>NO ERRORS</div>
                        :
                        data.map((e) => (
                            <div key={e._id} className='w-[90%] min-h-[300px] h-fit flex flex-col justify-between bg-bg-card p-2 text-white overflow-scroll'>
                                <div>
                                    <p className='text-[16px] text-customGreen font-bold'>Error : </p>
                                    <p>{e.error}</p>
                                </div>

                                <div>
                                    <p className='text-[16px] text-customGreen font-bold'>ErrorMessage : </p>
                                    <p>{e.errorMessage}</p>
                                </div>

                                <div>
                                    <p className='text-[16px] text-customGreen font-bold'>ErrorInComponent : </p>
                                    <p>{e.errorInComponent}</p>
                                </div>

                                <div className='w-full flex justify-between text-[12px]'>
                                    <p>{dayjs(e.createdAt).format("DD/MM/YY")}</p>
                                    <p>{e.errorFrom}</p>
                                </div>
                            </div>
                        ))
                    :
                    "Loading..."
                }
            </div>

        </div>
    )
}

export default AdminError
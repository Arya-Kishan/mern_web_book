import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";
import axios from "axios";

export const searchUser = async (name) => {
    let { data } = await axios(`${import.meta.env.VITE_SERVER_BASE_URL}/user?search=${name}`);
    return data.data;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["User"],
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/user/single/${userId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["User"]
        }),
        editUser: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/user/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        })
    })
})

export const { useGetSingleUserQuery, useDeleteUserMutation, useEditUserMutation } = userApi;
import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../services/AxiosApi";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["admin"],
    endpoints: (builder) => ({
        getAllError: builder.query({
            query: () => ({
                url: `/error/all`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["admin"]
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `/user`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
        }),
        deleteError: builder.mutation({
            query: (id) => ({
                url: `/error/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["admin"]
        })
    })
})

export const { useDeleteErrorMutation, useGetAllErrorQuery, useGetAllUsersQuery } = adminApi;

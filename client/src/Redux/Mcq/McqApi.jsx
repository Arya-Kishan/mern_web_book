import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const mcqApi = createApi({
    reducerPath: "mcqApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Mcq"],
    endpoints: (builder) => ({
        getUserMcqs: builder.query({
            query: (userId) => ({
                url: `/mcq/all/${userId}`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Mcq"]
        }),
        getMcq: builder.query({
            query: (mcqId) => ({
                url: `/mcq/${mcqId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Mcq"]
        }),
        addMcq: builder.mutation({
            query: (doc) => ({
                url: "/mcq",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Mcq"]
        }),
        editMcq: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/mcq/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Mcq"]
        }),
        deleteMcq: builder.mutation({
            query: (id) => ({
                url: `/mcq/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Mcq"]
        })
    })
})

export const { useGetMcqQuery, useGetUserMcqsQuery, useAddMcqMutation, useEditMcqMutation, useDeleteMcqMutation } = mcqApi;

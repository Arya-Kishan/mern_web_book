import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const interviewApi = createApi({
    reducerPath: "interviewApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Interview"],
    keepUnusedDataFor:300,
    endpoints: (builder) => ({
        getUserInterview: builder.query({
            query: (userId) => ({
                url: `/interview/all/${userId}`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Interview"]
        }),
        getInterview: builder.query({
            query: (interviewId) => ({
                url: `/interview/${interviewId}`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Interview"]
        }),
        addInterview: builder.mutation({
            query: (doc) => ({
                url: "/interview",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Interview"]
        }),
        editInterview: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/interview/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Interview"]
        }),
        deleteInterview: builder.mutation({
            query: (id) => ({
                url: `/interview/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Interview"]
        })
    })
})

export const { useGetInterviewQuery, useGetUserInterviewQuery, useEditInterviewMutation, useAddInterviewMutation, useDeleteInterviewMutation } = interviewApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const globalInterviewApi = createApi({
    reducerPath: "globalInterviewApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["GlobalInterview"],
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getGlobalInterviews: builder.query({
            query: () => ({
                url: `/globalInterview`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["GlobalInterview"]
        }),
        getSingleGlobalInterview: builder.query({
            query: (id) => ({
                url: `/globalInterview/single/${id}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            keepUnusedDataFor: 0,
            providesTags: ["GlobalInterview"]
        }),
        addGlobalInterview: builder.mutation({
            query: (doc) => ({
                url: "/globalInterview",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["GlobalInterview"]
        }),
        editGlobalInterview: builder.mutation({
            query: ({ id, query, ...doc }) => ({
                url: `/globalInterview/${id}?${query}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Interview"]
        }),
        deleteGlobalInterview: builder.mutation({
            query: (id) => ({
                url: `/globalInterview/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["GlobalInterview"]
        })
    })
})

export const { useGetGlobalInterviewsQuery, useAddGlobalInterviewMutation, useEditGlobalInterviewMutation, useDeleteGlobalInterviewMutation, useGetSingleGlobalInterviewQuery } = globalInterviewApi;

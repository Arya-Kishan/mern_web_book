import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const interviewApi = createApi({
    reducerPath: "interviewApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("x-webbook-jwt-routes");
            if (token) {
                headers.set('x-webbook-jwt-routes', token);
            }
            return headers;
        },
    }),
    tagTypes: ["Interview"],
    endpoints: (builder) => ({
        getUserInterview: builder.query({
            query: (userId) => (`/interview/all/${userId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Interview"]
        }),
        getInterview: builder.query({
            query: (interviewId) => (`/interview/${interviewId}`),
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

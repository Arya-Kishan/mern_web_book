import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const questionApi = createApi({
    reducerPath: "questionApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Question", "Options"],
    endpoints: (builder) => ({
        getAllQuestions: builder.query({
            query: (interviewId) => (`/questions/all/${interviewId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Question"]
        }),
        getQuestion: builder.query({
            query: (id) => (`/questions/${id}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Question"]
        }),
        addQuestion: builder.mutation({
            query: (doc) => ({
                url: "/questions",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Question"]
        }),
        editQuestion: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/questions/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Question"]
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/questions/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Question"]
        }),
    })
})

export const { useGetAllQuestionsQuery,useGetQuestionQuery, useAddQuestionMutation, useEditQuestionMutation, useDeleteQuestionMutation } = questionApi;

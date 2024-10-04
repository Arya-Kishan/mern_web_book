import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Comment"],
    keepUnusedDataFor:300,
    endpoints: (builder) => ({
        getcomment: builder.query({
            query: (questionId) => ({
                url: `/comment/${questionId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Comment"]
        }),
        addComment: builder.mutation({
            query: (doc) => ({
                url: "/comment",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Comment"]
        }),
        editComment: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/comment/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Comment"]
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/comment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Comment"]
        })
    })
})

export const { useGetcommentQuery, useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation } = commentApi;
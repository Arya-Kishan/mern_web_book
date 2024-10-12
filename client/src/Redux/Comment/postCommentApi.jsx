import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const postCommentApi = createApi({
    reducerPath: "postcommentApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["PostComment"],
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getPostComment: builder.query({
            query: (postId) => ({
                url: `/postComment/${postId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data.reverse()),
            providesTags: ["PostComment"]
        }),
        addPostComment: builder.mutation({
            query: (doc) => ({
                url: "/postComment",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["PostComment"]
        }),
        editPostComment: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/postComment/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["PostComment"]
        }),
        deletePostComment: builder.mutation({
            query: (id) => ({
                url: `/postComment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["PostComment"]
        })
    })
})

export const { useAddPostCommentMutation, useDeletePostCommentMutation, useEditPostCommentMutation, useGetPostCommentQuery } = postCommentApi;

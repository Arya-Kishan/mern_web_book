import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentApi = createApi({
    reducerPath: "commentApi",
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
    tagTypes: ["Comment"],
    endpoints: (builder) => ({
        getcomment: builder.query({
            query: (questionId) => (`/comment/${questionId}`),
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
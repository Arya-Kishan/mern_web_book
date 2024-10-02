import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const globalInterviewCommentApi = createApi({
    reducerPath: "globalInterviewcommentApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["globalInterviewComment"],
    endpoints: (builder) => ({
        getGlobalInterviewComment: builder.query({
            query: (questionId) => ({
                url: `/globalInterviewComment/${questionId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["globalInterviewComment"]
        }),
        addGlobalInterviewComment: builder.mutation({
            query: (doc) => ({
                url: "/globalInterviewComment",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["globalInterviewComment"]
        }),
        editGlobalInterviewComment: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/globalInterviewComment/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["globalInterviewComment"]
        }),
        deleteGlobalInterviewComment: builder.mutation({
            query: (id) => ({
                url: `/globalInterviewComment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["globalInterviewComment"]
        })
    })
})

export const { useAddGlobalInterviewCommentMutation, useDeleteGlobalInterviewCommentMutation, useEditGlobalInterviewCommentMutation, useGetGlobalInterviewCommentQuery } = globalInterviewCommentApi;

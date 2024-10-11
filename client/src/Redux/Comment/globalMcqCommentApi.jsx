import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const globalMcqCommentApi = createApi({
    reducerPath: "globalMcqCommentApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["globalMcqComment"],
    keepUnusedDataFor:300,
    endpoints: (builder) => ({
        getGlobalMcqComment: builder.query({
            query: (mcqId) => ({
                url: `/globalMcqComment/${mcqId}`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data.reverse()),
            providesTags: ["globalMcqComment"]
        }),
        addGlobalMcqComment: builder.mutation({
            query: (doc) => ({
                url: "/globalMcqComment",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["globalMcqComment"]
        }),
        editGlobalMcqComment: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/globalMcqComment/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["globalMcqComment"]
        }),
        deleteGlobalMcqComment: builder.mutation({
            query: (id) => ({
                url: `/globalMcqComment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["globalMcqComment"]
        })
    })
})

export const { useAddGlobalMcqCommentMutation, useDeleteGlobalMcqCommentMutation, useEditGlobalMcqCommentMutation, useGetGlobalMcqCommentQuery } = globalMcqCommentApi;

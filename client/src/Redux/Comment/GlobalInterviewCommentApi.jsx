import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const globalInterviewCommentApi = createApi({
    reducerPath: "globalInterviewcommentApi",
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
    tagTypes: ["globalInterviewComment"],
    endpoints: (builder) => ({
        getGlobalInterviewComment: builder.query({
            query: (questionId) => (`/globalInterviewComment/${questionId}`),
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

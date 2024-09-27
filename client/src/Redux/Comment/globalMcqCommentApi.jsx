import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const globalMcqCommentApi = createApi({
    reducerPath: "globalMcqCommentApi",
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
    tagTypes: ["globalMcqComment"],
    endpoints: (builder) => ({
        getGlobalMcqComment: builder.query({
            query: (mcqId) => (`/globalMcqComment/${mcqId}`),
            transformResponse: (res) => (res.data),
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

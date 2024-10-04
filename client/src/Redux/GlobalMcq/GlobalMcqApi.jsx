import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const globalMcqApi = createApi({
    reducerPath: "globalMcqApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["GlobalMcq"],
    keepUnusedDataFor:300,
    endpoints: (builder) => ({
        getGlobalMcqs: builder.query({
            query: () => ({
                url:`/globalMcq`,
                method:"GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["GlobalMcq"]
        }),
        addGlobalMcq: builder.mutation({
            query: (doc) => ({
                url: "/globalMcq",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["GlobalMcq"]
        }),
        editGlobalMcq: builder.mutation({
            query: ({ id, query, ...doc }) => ({
                url: `/globalMcq/${id}?${query}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["GlobalMcq"]
        }),
        deleteGlobalMcq: builder.mutation({
            query: (id) => ({
                url: `/globalMcq/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["GlobalMcq"]
        })
    })
})

export const { useGetGlobalMcqsQuery, useAddGlobalMcqMutation, useEditGlobalMcqMutation, useDeleteGlobalMcqMutation } = globalMcqApi;

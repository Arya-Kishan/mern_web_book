import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const optionApi = createApi({
    reducerPath: "optionApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Options"],
    endpoints: (builder) => ({
        getAllOptions: builder.query({
            query: (mcqId) => ({
                url: `/options/all/${mcqId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Options"]
        }),
        getOption: builder.query({
            query: (id) => ({
                url: `/options/${id}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Options"]
        }),
        addOptions: builder.mutation({
            query: (doc) => ({
                url: "/options",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Options"]
        }),
        editOptions: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/options/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Options"]
        }),
        deleteOptions: builder.mutation({
            query: (id) => ({
                url: `/options/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Options"]
        })
    })
})

export const { useGetOptionQuery, useGetAllOptionsQuery, useEditOptionsMutation, useDeleteOptionsMutation, useAddOptionsMutation } = optionApi;

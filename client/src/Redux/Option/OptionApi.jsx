import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const optionApi = createApi({
    reducerPath: "optionApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Options"],
    endpoints: (builder) => ({
        getAllOptions: builder.query({
            query: (mcqId) => (`/options/all/${mcqId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Options"]
        }),
        getOption: builder.query({
            query: (id) => (`/options/${id}`),
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

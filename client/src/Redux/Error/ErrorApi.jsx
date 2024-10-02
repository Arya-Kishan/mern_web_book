import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const errorApi = createApi({
    reducerPath: "errorApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["error"],
    endpoints: (builder) => ({
        getAllError: builder.query({
            query: () => ({
                url: `/error/all`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["error"]
        }),
        addError: builder.mutation({
            query: (doc) => ({
                url: "/error",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["error"]
        }),
        editError: builder.mutation({
            query: ({ id, query, ...doc }) => ({
                url: `/error/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["error"]
        }),
        deleteError: builder.mutation({
            query: (id) => ({
                url: `/error/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["error"]
        })
    })
})

export const { useAddErrorMutation, useDeleteErrorMutation, useEditErrorMutation, useGetAllErrorQuery } = errorApi;

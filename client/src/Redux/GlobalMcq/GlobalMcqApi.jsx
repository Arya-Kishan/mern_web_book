import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const globalMcqApi = createApi({
    reducerPath: "globalMcqApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["GlobalMcq"],
    endpoints: (builder) => ({
        getGlobalMcqs: builder.query({
            query: (fake) => (`/globalMcq`),
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
        deleteGlobalMcq: builder.mutation({
            query: (id) => ({
                url: `/globalMcq/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["GlobalMcq"]
        })
    })
})

export const { useGetGlobalMcqsQuery, useAddGlobalMcqMutation, useDeleteGlobalMcqMutation } = globalMcqApi;

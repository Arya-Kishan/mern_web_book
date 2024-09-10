import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const globalInterviewApi = createApi({
    reducerPath: "globalInterviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["GlobalInterview"],
    endpoints: (builder) => ({
        getGlobalInterviews: builder.query({
            query: () => (`/globalInterview`),
            transformResponse: (res) => (res.data),
            providesTags: ["GlobalInterview"]
        }),
        addGlobalInterview: builder.mutation({
            query: (doc) => ({
                url: "/globalInterview",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["GlobalInterview"]
        }),
        deleteGlobalInterview: builder.mutation({
            query: (id) => ({
                url: `/globalInterview/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["GlobalInterview"]
        })
    })
})

export const { useGetGlobalInterviewsQuery, useAddGlobalInterviewMutation, useDeleteGlobalInterviewMutation } = globalInterviewApi;

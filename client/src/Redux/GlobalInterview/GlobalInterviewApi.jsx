import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const globalInterviewApi = createApi({
    reducerPath: "globalInterviewApi",
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
        editGlobalInterview: builder.mutation({
            query: ({ id, query, ...doc }) => ({
                url: `/globalInterview/${id}?${query}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Interview"]
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

export const { useGetGlobalInterviewsQuery, useAddGlobalInterviewMutation, useEditGlobalInterviewMutation, useDeleteGlobalInterviewMutation } = globalInterviewApi;

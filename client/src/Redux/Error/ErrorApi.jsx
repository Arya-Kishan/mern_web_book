import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const errorApi = createApi({
    reducerPath: "errorApi",
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
    tagTypes: ["error"],
    endpoints: (builder) => ({
        getAllError: builder.query({
            query: () => (`/error/all`),
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

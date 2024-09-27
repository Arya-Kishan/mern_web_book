import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const globalMcqApi = createApi({
    reducerPath: "globalMcqApi",
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
        editGlobalMcq: builder.mutation({
            query: ({ id, query, ...doc }) => ({
                url: `/globalMcq/${id}?${query}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Interview"]
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

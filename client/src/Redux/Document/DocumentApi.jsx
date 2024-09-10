import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const documentApi = createApi({
    reducerPath: "documentApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Document"],
    endpoints: (builder) => ({
        getDocument: builder.query({
            query: (documentId) => (`/document/${documentId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Document"]
        }),
        addDocument: builder.mutation({
            query: (doc) => ({
                url: "/document",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Document"]
        }),
        editDocument: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/document/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Document"]
        }),
        deleteDocument: builder.mutation({
            query: (id) => ({
                url: `/document/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Document"]
        })
    })
})

export const { useGetDocumentQuery, useGetUserDocumentsQuery, useAddDocumentMutation, useEditDocumentMutation, useDeleteDocumentMutation } = documentApi;

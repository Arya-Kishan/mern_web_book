import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const noteApi = createApi({
    reducerPath: "noteApi",
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
    tagTypes: ["Note"],
    endpoints: (builder) => ({
        getUserNotes: builder.query({
            query: (userId) => (`/note/all/${userId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Note"]
        }),
        getNote: builder.query({
            query: (noteId) => (`/note/${noteId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Note"]
        }),
        addNote: builder.mutation({
            query: (doc) => ({
                url: "/note",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Note"]
        }),
        editNote: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/note/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Note"]
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/note/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Note"]
        })
    })
})

export const { useGetNoteQuery, useGetUserNotesQuery, useAddNoteMutation, useEditNoteMutation, useDeleteNoteMutation } = noteApi;

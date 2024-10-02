import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const noteApi = createApi({
    reducerPath: "noteApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Note"],
    endpoints: (builder) => ({
        getUserNotes: builder.query({
            query: (userId) => ({
                url: `/note/all/${userId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Note"]
        }),
        getNote: builder.query({
            query: (noteId) => ({
                url: `/note/${noteId}`,
                method: "GET"
            }),
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

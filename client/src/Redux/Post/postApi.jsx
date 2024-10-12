import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Post"],
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => ({
                url: `/post/all`,
                method: "GET"
            }),
            transformResponse: (res) => (res.data.reverse()),
            providesTags: ["Post"]
        }),
        getUserPosts: builder.query({
            query: (id) => ({
                url: `/post/user/${id}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data.reverse()),
            providesTags: ["Post"]
        }),
        getSinglePost: builder.query({
            query: (id) => ({
                url: `/post/single/${id}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Post"]
        }),
        addPost: builder.mutation({
            query: (doc) => ({
                url: "/post",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Post"]
        }),
        editPost: builder.mutation({
            query: ({ id, query, ...doc }) => ({
                url: `/post/${id}?${query}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Post"]
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/post/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Post"]
        }),
    })
})

export const { useAddPostMutation, useDeletePostMutation, useEditPostMutation, useGetAllPostsQuery, useGetSinglePostQuery, useGetUserPostsQuery } = postApi;

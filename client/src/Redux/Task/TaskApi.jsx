import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        getUserTasks: builder.query({
            query: (userId) => (`/task/all/${userId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Task"]
        }),
        getTask: builder.query({
            query: (taskId) => (`/task/${taskId}`),
            transformResponse: (res) => (res.data),
            providesTags: ["Task"]
        }),
        addTask: builder.mutation({
            query: (doc) => ({
                url: "/task",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Task"]
        }),
        editTask: builder.mutation({
            query: ({ id, ...doc }) => ({
                url: `/task/${id}`,
                method: "PUT",
                body: doc,
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"]
        })
    })
})

export const { useGetTaskQuery, useGetUserTasksQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = taskApi;

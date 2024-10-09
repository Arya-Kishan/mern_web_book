import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["Notification"],
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: (id) => ({
                url: `/notification/global`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Notification"]
        }),
        getUserNotifications: builder.query({
            query: (userId) => ({
                url: `/notification/global/user/${userId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["Notification"]
        }),
        addNotification: builder.mutation({
            query: (doc) => ({
                url: "/notification/global",
                method: "POST",
                body: doc,
            }),
            invalidatesTags: ["Notification"]
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notification/global/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Notification"]
        })
    })
})

export const { useAddNotificationMutation, useDeleteNotificationMutation, useGetAllNotificationsQuery, useGetUserNotificationsQuery } = notificationApi;
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/AxiosApi";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_SOCKET_BASE_URL + "/socket/message",
  }),
  tagTypes: ["Chat"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getConversation: builder.query({
      query: ({ sender, receiver }) => ({
        url: `/getMessages?sender=${sender}&receiver=${receiver}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Chat"],
    }),
    getUserChatList: builder.query({
      query: (userId) => ({
        url: `/getChatLists?userId=${userId}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Chat"],
    }),
    addMessage: builder.mutation({
      query: (doc) => ({
        url: "/send",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["Chat"],
    }),
    editMessage: builder.mutation({
      query: ({ doc }) => ({
        url: `/updateMessage`,
        method: "PUT",
        body: doc,
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/deleteMessage`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteConversationMessages: builder.mutation({
      query: ({ id, type }) => ({
        url: `/deleteConversationMessages/${id}?type=${type}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useAddMessageMutation,
  useDeleteChatMutation,
  useEditMessageMutation,
  useGetConversationQuery,
  useDeleteConversationMessagesMutation,
  useGetUserChatListQuery,
} = chatApi;

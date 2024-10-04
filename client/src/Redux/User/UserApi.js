import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../../services/AxiosApi";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/user/single/${userId}`,
                method: 'GET'
            }),
            transformResponse: (res) => (res.data),
            providesTags: ["User"]
        }),
    })
})

export const { useGetSingleUserQuery } = userApi;
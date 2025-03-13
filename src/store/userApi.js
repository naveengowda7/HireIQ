import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    saveUserData: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      })
    })
  })
})

export const { useSaveUserDataMutation } = userApi;
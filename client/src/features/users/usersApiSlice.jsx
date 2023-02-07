import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOneUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
  })
});

export const { useGetOneUserQuery } = usersApiSlice
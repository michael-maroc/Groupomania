import { apiSlice } from "./api/apiSlice";

export const likesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addLike: builder.mutation({
      query: (PostId) => ({
        url: "/likes",
        method: "POST",
        body: { ...PostId }
      }),
    }),
  })
})

export const { useAddLikeMutation } = likesApiSlice;
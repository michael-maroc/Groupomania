import { apiSlice } from "./api/apiSlice";

export const likesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPostLikes: builder.query({
      query: (postId) => `/likes/${postId}`,
      providesTags: ["Likes"]
    }),
    addLike: builder.mutation({
      query: (PostId) => ({
        url: "/likes",
        method: "POST",
        body: { ...PostId }
      }),
      invalidatesTags: ["Likes"]
    }),
  })
})

export const { useAddLikeMutation, useGetPostLikesQuery } = likesApiSlice;
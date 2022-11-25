import { apiSlice } from "../../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: { ...postData },
      }),
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation } = postApiSlice;

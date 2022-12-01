import { apiSlice } from "../../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: { ...postData },
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation, useDeletePostMutation } = postApiSlice;

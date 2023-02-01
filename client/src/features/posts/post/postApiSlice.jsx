import { apiSlice } from "../../../app/api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  // Posts part
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
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
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: { ...post },
      }),
      invalidatesTags: ["Posts"],
    }),

  // Comments part
    getAllComments: builder.query({
      query: () => `/comments`,
      providesTags: ["Comments"],
    }),
    getPostComments: builder.query({
      query: (PostId) => `/comments/${PostId}`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: ({ PostId, comment }) => ({
        url: `/comments`,
        method: "POST",
        body: { PostId, comment },
      }),
      invalidatesTags: ["Comments"]
    }),

    // Likes part
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
  }),
});

export const { 
  useGetAllCommentsQuery,
  useGetAllPostsQuery, 
  useCreatePostMutation, 
  useDeletePostMutation, 
  useUpdatePostMutation, 
  useGetPostCommentsQuery, 
  useAddCommentMutation, 
  useGetPostLikesQuery, 
  useAddLikeMutation } = postApiSlice;

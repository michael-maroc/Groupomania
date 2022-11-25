import { apiSlice } from "../../api/apiSlice";

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: (PostId) => `/comments/${PostId}`,
    }),
    addComment: builder.mutation({
      query: ({ PostId, comment }) => ({
        url: `/comments`,
        method: "POST",
        body: { PostId, comment },
      }),
    }),
  }),
});

export const { useGetPostCommentsQuery, useAddCommentMutation } = commentsApiSlice;

import { apiSlice } from "../slices/api/apiSlice";

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetPostCommentsQuery, useAddCommentMutation } = commentsApiSlice;

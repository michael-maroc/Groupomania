import { apiSlice } from "../../app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvatar: builder.query({
      query: (UserId) => `/avatars/${UserId}`,
      providesTags: ["ProfilePic"]
    }),
    addAvatar: builder.mutation({
      query: (avatarData) => ({
        url: "/avatars",
        method: "POST",
        body: { ...avatarData },
      }),
      invalidatesTags: ["ProfilePic"]
    })
  })
})

export const { useAddAvatarMutation, useGetAvatarQuery } = profileApiSlice;
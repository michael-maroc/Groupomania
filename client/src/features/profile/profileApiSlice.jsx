import { apiSlice } from "../../app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAvatars: builder.query({
      query: () => `/avatars`,
      providesTags: ["ProfilePic"]
    }),
    getOneAvatar: builder.query({
      query: (id) => `/avatars/${id}`,
      providesTags: ["ProfilePic"]
    }),
    addAvatar: builder.mutation({
      query: (avatarData) => ({
        url: "/avatars",
        method: "POST",
        body: { ...avatarData },
      }),
      invalidatesTags: ["ProfilePic"]
    }),
    updateAvatar: builder.mutation({
      query: (avatarData) => ({
        url: "/avatars",
        method: "PATCH",
        body: { ...avatarData },
      }),
      invalidatesTags: ["ProfilePic"]
    })
  })
})

export const { useGetAllAvatarsQuery, useAddAvatarMutation, useGetOneAvatarQuery, useUpdateAvatarMutation } = profileApiSlice;
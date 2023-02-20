import { apiSlice } from "app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAvatars: builder.query({
      query: () => `/avatars`,
      providesTags: ["Avatars"]
    }),
    getOneAvatar: builder.query({
      query: (id) => `/avatars/${id}`,
      providesTags: ["Avatars"]
    }),
    addAvatar: builder.mutation({
      query: (avatarData) => ({
        url: "/avatars",
        method: "POST",
        body: { ...avatarData },
      }),
      invalidatesTags: ["Avatars"]
    }),
    updateAvatar: builder.mutation({
      query: (avatarData) => ({
        url: "/avatars",
        method: "PATCH",
        body: { ...avatarData },
      }),
      invalidatesTags: ["Avatars"]
    })
  })
})

export const { useGetAllAvatarsQuery, useAddAvatarMutation, useGetOneAvatarQuery, useUpdateAvatarMutation } = profileApiSlice;
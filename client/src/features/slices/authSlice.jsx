import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;

export const getCurrentToken = (state) => state.auth.token;

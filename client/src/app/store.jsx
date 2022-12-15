import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/slices/api/apiSlice";
import authReducer from "../features/slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

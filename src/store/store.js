import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})

export default store;
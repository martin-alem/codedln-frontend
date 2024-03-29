import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authUserReducer from "./slice/auth.slice";
import { authApi } from "./api/auth.api";
import { userApi } from "./api/user.api";
import { urlApi } from "./api/url.api";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [urlApi.reducerPath]: urlApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, urlApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

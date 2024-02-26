import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGoogleOAuthPayload} from "../utils/types";

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/user`,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    googleSignIn: builder.mutation({
      query: (payload: IGoogleOAuthPayload) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGoogleSignInMutation } = authApi;

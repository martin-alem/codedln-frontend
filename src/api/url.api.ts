import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateShortUrlPayload, IServerResponse, IUrl } from "../utils/types";

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const urlApi = createApi({
  reducerPath: "urlApi",
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/url`,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    CreateUrl: builder.mutation<IServerResponse<IUrl>, ICreateShortUrlPayload>({
      query: (payload: ICreateShortUrlPayload) => ({
        url: payload.endpoint,
        method: "POST",
        body: payload.payload,
      }),
    }),
  }),
});

export const { useCreateUrlMutation } = urlApi;

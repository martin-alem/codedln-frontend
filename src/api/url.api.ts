import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateShortUrlPayload, IGetUrlPayload, IPaginatedUrl, IServerResponse, IUrl } from "../utils/types";

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

    GetUrl: builder.query<IServerResponse<IPaginatedUrl>, IGetUrlPayload>({
      query: (payload: IGetUrlPayload) => ({
        url: `/get_urls?query=${payload.query}&date_sort=${payload.sort}&limit=${payload.limit}`,
        method: "GET",
      }),
    }),

    DeleteUrl: builder.mutation<IServerResponse<void>, string>({
      query: (payload: string) => ({
        url: `/delete_url/${payload}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateUrlMutation, useGetUrlQuery, useDeleteUrlMutation } = urlApi;

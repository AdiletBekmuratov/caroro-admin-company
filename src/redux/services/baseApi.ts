import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../http";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers) => headers,
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export const {} = baseApi;

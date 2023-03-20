import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// api link

export const stocksApi = createApi({
  // name
  reducerPath: "stocksApi",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({ baseUrl: "stocksSource" }),

  // list of queries
  endpoints: (builder) => ({
    getAllStocks: builder.query, // query to get a data, but if we want to update something, use "mutation"
  }),
});

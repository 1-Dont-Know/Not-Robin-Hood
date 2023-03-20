import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// api link
const stocksSource =
  "https://finnhub.io/api/v1/search?q=apple&token=cgal7v9r01qkpvoj1i80cgal7v9r01qkpvoj1i8g";

export const stocksApi = createApi({
  // name
  reducerPath: "stocksApi",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({ baseUrl: stocksSource }),

  // list of queries
  endpoints: (builder) => ({
    getAllStocks: builder.query, // query to get a data, but if we want to update something, use "mutation"
  }),
});

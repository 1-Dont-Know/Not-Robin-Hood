import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = `${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`;

export const alphaVantageApiSlice = createApi({
  reducerPath: "alphaVantageApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.alphavantage.co",
  }),
  endpoints: (builder) => ({
    getStockTicker: builder.query({
      query: (userQuery) =>
        `/query?function=SYMBOL_SEARCH&keywords=${userQuery}&apikey=${api_key}`,
    }),
  }),
});

export const { useGetStockTickerQuery } = alphaVantageApiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = `${process.env.REACT_APP_API_KEY}`; // Our API Key

export const finnhubApiSlice = createApi({
  // name
  reducerPath: "finnhubApiSlice",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({baseUrl: "https://finnhub.io/api/v1"}),
  // list of queries
  endpoints: (builder) => ({
    getStockTicker: builder.query({
      query: () => `/stock/symbol?exchange=US&token=${api_key}`,
    }),

    getStockDetails: builder.query({
      query: (stockSymbol) => `/stock/profile2?q=symbol=${stockSymbol}&token=${api_key}`
    }),
  }),
});

export const { useGetStockTickerQuery, useGetStockDetailsQuery } = finnhubApiSlice;

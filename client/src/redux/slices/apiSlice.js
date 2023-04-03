import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = `${process.env.REACT_APP_API_KEY}` ; // Our API Key

export const finnhubApiSlice = createApi({
  // name
  reducerPath: "apiSlice",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({baseUrl: "https://finnhub.io/api/v1"}),
  // list of queries
  endpoints: (builder) => ({
    getStockTicker: builder.query({
      query: (userQuery) => `/search?q=${userQuery}&token=${api_key}`,
    }),

    getPrice: builder.query({
      query: (company) => `/quote?symbol=${company}&token=${api_key}`,
    }),
    getCompanies: builder.query({
      query: () => `/stock/symbol?exchange=US&token=${api_key}`,
    }),
    getMap: builder.query({
      query: () => `/stock/candle?symbol=AAPL&resolution=1&from=1679476980&to=1679649780&token=${api_key}`,
    })
  }),
});

export const { useGetStockTickerQuery, useGetPriceQuery, useGetCompaniesQuery, useGetMapQuery } = apiSlice;

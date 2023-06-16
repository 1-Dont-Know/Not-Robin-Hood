import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = `${process.env.REACT_APP_FINNHUB_API_KEY}`;

export const finnhubApiSlice = createApi({
  // name
  reducerPath: "finnhubApiSlice",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({ baseUrl: "https://finnhub.io/api/v1" }),
  // list of queries
  endpoints: (builder) => ({
    // getStockTicker: builder.query({
    //   query: (userQuery) => `/search?q=${userQuery}&token=${api_key}`,
    // }),

    getPrice: builder.query({
      query: (company) => `/quote?symbol=${company}&token=${api_key}`,
    }),

    getCompanies: builder.query({
      query: () => `/stock/symbol?exchange=US&token=${api_key}`,
    }),

    //Query for historical data. Symbol is the stock symbol and numDays is the number of days closing data you want.
    getCandleData: builder.query({
      query: (symbol, numDays) => `/stock/candle?symbol=${symbol}&resolution=D&count=${numDays}&token=${api_key}`,
    })
  }),
});

export const { useGetPriceQuery, useGetCompaniesQuery, useGetCandleDataQuery } = finnhubApiSlice;

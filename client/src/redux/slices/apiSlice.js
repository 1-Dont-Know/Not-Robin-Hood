import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api_key= `${process.env.REACT_APP_API_KEY}`; // Our API Key

const transformResponse = (response) => {
    return response.result; // assuming the API response has a 'result' property that contains the data you want
};

export const stocksApi = createApi({
    reducerPath: "stocksApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://finnhub.io/api/v1"}),
    endpoints: (builder) => ({
        getStockTicker: builder.query({
            query: (userInput) => `/search?q=${userInput}&token=${api_key}`,
        }),

    }),
});

export const { useGetStockTickerQuery } = stocksApi;
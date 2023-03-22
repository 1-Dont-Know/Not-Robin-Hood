import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const balanceApi = createApi({
  // name
  reducerPath: "balanceApi",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7700/",
  }),
  // list of queries
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => "balance",
    }),
    addBalance: builder.mutation({
      query: (amount) => ({
        url: "update",
        method: "PUT",
        body: { amount },
      }),
    }),
  }),
});

export const { useGetBalanceQuery, useAddBalanceMutation } = balanceApi;

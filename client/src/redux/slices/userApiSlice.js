import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  // name
  reducerPath: "userApiSlice",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7700",
  }),
  // list of queries
  endpoints: (builder) => ({

    getBalance: builder.query({
      query: () => "/balance",
    }),

    updateBalance: builder.mutation({
      query: (user) => ({
        url: `/update/${user.id}`,
        method: "PATCH",
        body: user,
      }),
    }),

    
  }),
});

export const { useGetBalanceQuery, useUpdateBalanceMutation } = userApiSlice;

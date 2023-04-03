import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  // name
  reducerPath: "userApiSlice",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({
    baseUrl: "https://not-robin-hood-bdrk.vercel.app",
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  // name
  reducerPath: "balanceApi",
  //   source from where to fetch data from
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7700",
  }),
  tagTypes: [
    "Balance",
    "Stocks",
    "User",
    "AssetValue",
    "AssetCondition",
    "Notifications",
  ],

  endpoints: (builder) => ({
    //* Get "CURRENT USER"
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    //* Get "BALANCE"
    getBalance: builder.query({
      query: (userId) => `/users/${userId}/balance`,
      transformResponse: (response) => response.balance,
      providesTags: ["Balance"],
    }),
    //* Add "BALANCE"
    addBalance: builder.mutation({
      query: ({ id, amount }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: ["Balance"],
    }),

    //* Get "ASSET VALUE"
    getAssetValue: builder.query({
      query: (userId) => `users/${userId}/asset`,
      transformResponse: (response) => response.value,
      providesTags: ["AssetValue"],
    }),
    //* Get "ASSET CONDITION"
    getAssetCondition: builder.query({
      query: (userId) => `users/${userId}/condition`,
      transformResponse: (response) => response.condition,
      providesTags: ["AssetCondition"],
    }),
    //* Get "ASSET PERCENTAGE"
    getAssetPercentage: builder.query({
      query: (userId) => `users/${userId}/percentage`,
      transformResponse: (response) => response.percentage,
      providesTags: ["AssetPercentage"],
    }),

    //* Get NOTIFICATIONS
    getNotifications: builder.query({
      query: (userId) => `users/${userId}/notifications`,
      transformResponse: (response) => response.message,
      providesTags: ["Notifications"],
    }),

    //* Get "PORTFOLIO STOCKS"
    getPortfolioStocks: builder.query({
      query: () => "/portfolio",
      providesTags: ["Stocks"],
    }),
    //* Update "PORTFOLIO STOCKS"
    updatePortfolioStocks: builder.mutation({
      query: () => ({
        url: "/portfolio",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Stocks"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetBalanceQuery,
  useAddBalanceMutation,
  useGetAssetValueQuery,
  useGetAssetConditionQuery,
  useGetAssetPercentageQuery,
  useGetPortfolioStocksQuery,
  useGetNotificationsQuery,
  useUpdatePortfolioStocksMutation,
} = userApi;

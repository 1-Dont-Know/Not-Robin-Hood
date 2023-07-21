import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";
import jwt_decode from "jwt-decode";

const baseQuery = fetchBaseQuery({
  //? our base url, will be changed to our server url in production mode

  baseUrl: `${process.env.REACT_APP_USERS_BASE_URL}`,

  //? to include cookies
  credentials: "include",
  //? once we have a token we will set authorization header, and returning headers from prepareHeaders function
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      console.log("User id from our store:", user);
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, userId: user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
      console.log("REFETCHED REFRESH TOKEN: ", result);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const userApi = createApi({
  //? name
  reducerPath: "userApi",
  //?   source from where to fetch data from (temporary localhost) to be changed to our server url
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Balance",
    "Stocks",
    "User",
    "searchQuery",
    "AssetValue",
    "AssetCondition",
    "Notifications",
    "Transactions",
    "PortfolioValue",
  ],

  endpoints: (builder) => ({
    // *** REFRESH TOKEN
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: "api/refresh",
        method: "POST",
      }),
      transformResponse: (response) => {
        const { accessToken } = response;
        const decodedToken = jwt_decode(accessToken);
        return { accessToken, userId: decodedToken.userId };
      },
    }),
    // ! REGISTER USER
    registerUser: builder.mutation({
      query: (user) => ({
        url: "api/register",
        method: "POST",
        body: user,
      }),
    }),

    // ? Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "api/logout",
        method: "POST",
      }),
    }),
    //* Get "CURRENT USER"
    getUserById: builder.query({
      query: (id) => `user/${id}/info`,
      providesTags: ["User"],
    }),
    //* Get Search Results
    getSearchResult: builder.query({
      query: (userQuery) => `user/search/${userQuery}`,
      transformResponse: (response) => response.results,
      providesTags: ["searchQuery"],
    }),
    //* Get "BALANCE"
    getBalance: builder.query({
      query: (userId) => `/user/${userId}/balance`,
      transformResponse: (response) => response.balance,
      providesTags: ["Balance"],
    }),
    //* Add "BALANCE"
    addBalance: builder.mutation({
      query: ({ id, amount }) => ({
        url: `user/balance/${id}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: ["Balance"],
    }),

    //* Get "User's Asset (Value, Condition, Percentage)"
    getAssetValue: builder.query({
      query: (userId) => `user/${userId}/asset`,
      transformResponse: (response) => response,
      providesTags: ["AssetValue", "AssetCondition", "AssetPercentage"],
    }),
    //* Get NOTIFICATIONS
    getNotifications: builder.query({
      query: (userId) => `user/${userId}/notifications`,
      transformResponse: (response) => response.data,
      providesTags: ["Notifications"],
    }),

    //* Get "PORTFOLIO STOCKS"
    getPortfolioStocks: builder.query({
      query: (userId) => `user/${userId}/portfolio/stocks`,
      providesTags: ["Stocks"],
    }),
    //* Update "PORTFOLIO STOCKS"
    updatePortfolioStocks: builder.mutation({
      query: ({
        userID,
        id,
        symbol,
        stockPrice,
        company,
        share,
        totalCost,
        date,
      }) => ({
        url: "user/portfolio/stocks",
        method: "POST",
        body: {
          userID,
          id,
          symbol,
          stockPrice,
          company,
          share,
          totalCost,
          date,
        },
      }),
      invalidatesTags: ["Stocks"],
    }),
    // Modify stocks
    modifyPortfolioStocks: builder.mutation({
      query: ({ userID, id, share, symbol, stockPrice, totalCost, date }) => ({
        url: "user/portfolio/stocks/update",
        method: "PATCH",
        body: {
          userID,
          id,
          share,
          symbol,
          stockPrice,
          totalCost,
          date,
        },
      }),
      invalidatesTags: ["Stocks"],
    }),
    setPortfolioStocksTotalReturn: builder.mutation({
      query: ({ totalReturn, symbol, stockPrice, share }) => ({
        url: "user/portfolio/stocks/return/update",
        method: "PATCH",
        body: { totalReturn, symbol, stockPrice, share },
      }),
      invalidatesTags: ["Stocks"],
    }),

    // delete Stocks
    deletePortfolioStocks: builder.mutation({
      query: ({ userID, symbol, company }) => ({
        url: `user/portfolio/stocks/${userID}/${symbol}/${company}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stocks"],
    }),
    // Get user's transactions
    getStockTransactions: builder.query({
      query: (userId) => `user/${userId}/transactions`,
      transformResponse: (response) => response.data,
      providesTags: ["Transactions"],
    }),
    addStockTransactions: builder.mutation({
      query: ({ userID, id, name, price, qty, amount, description, date }) => ({
        url: `user/${userID}/transactions/update`,
        method: "POST",
        body: { userID, id, name, price, qty, amount, description, date },
      }),
      invalidatesTags: ["Transactions"],
    }),
    getPortfolioTotalValue: builder.query({
      query: (userId) => `user/${userId}/portfolio/value`,
      transformResponse: (response) => response.data,
      providesTags: ["PortfolioValue"],
    }),
    updatePortfolioValue: builder.mutation({
      query: ({ userId, stocksPower, buyingPower }) => ({
        url: `user/${userId}/portfolio/value/update`,
        method: "POST",
        invalidatesTags: ["PortfolioValue"],
      }),
    }),
    changePassword: builder.mutation({
      query: ({ userID, newPassword, oldPassword }) => ({
        url: `user/changepassword/update`,
        method: "PATCH",
        body: { userID, newPassword, oldPassword },
      }),
    }),
    changeName: builder.mutation({
      query: ({ userID, oldName, newName }) => ({
        url: `user/changename/update`,
        method: "PATCH",
        body: { userID, oldName, newName },
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetBalanceQuery,
  useGetSearchResultQuery,
  useAddBalanceMutation,
  useGetAssetValueQuery,
  useGetAssetConditionQuery,
  useGetAssetPercentageQuery,
  useGetPortfolioStocksQuery,
  useGetNotificationsQuery,
  useRefreshAccessTokenMutation,
  useUpdatePortfolioStocksMutation,
  useDeletePortfolioStocksMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetStockTransactionsQuery,
  useGetPortfolioTotalValueQuery,
  useUpdatePortfolioValueMutation,
  useAddStockTransactionsMutation,
  useModifyPortfolioStocksMutation,
  useSetPortfolioStocksTotalReturnMutation,
  useChangePasswordMutation,
  useChangeNameMutation,
} = userApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";
import jwt_decode from "jwt-decode";

const baseQuery = fetchBaseQuery({
  //? our base url, will be changed to our server url in production mode
  // baseUrl: "http://localhost:7700/",
  baseUrl: "https://not-robin-hood-bdrk.vercel.app/",
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
    "AssetValue",
    "AssetCondition",
    "Notifications",
  ],

  endpoints: (builder) => ({
    // *** REFRESH TOKEN
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
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
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),

    // ? Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
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
      query: (stock) => ({
        url: "/portfolio",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: stock,
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
  useRefreshAccessTokenMutation,
  useUpdatePortfolioStocksMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = userApi;

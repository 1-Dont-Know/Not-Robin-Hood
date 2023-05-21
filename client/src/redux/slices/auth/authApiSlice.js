import { userApi } from "../user/userApiSlice";
import jwt_decode from "jwt-decode";

export const authApiSlice = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: (response) => {
        const { accessToken } = response;
        const decodedToken = jwt_decode(accessToken);
        return { accessToken, userId: decodedToken.userId };
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;

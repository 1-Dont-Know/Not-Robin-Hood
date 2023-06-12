import { useGetPriceQuery } from "../redux/slices/api/finnhubApiSlice";

export const useFetchPrices = (company) => {
  return useGetPriceQuery(company);
};

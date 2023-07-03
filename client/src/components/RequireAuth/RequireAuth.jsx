import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/slices/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  useGetPortfolioStocksQuery,
  useSetPortfolioStocksTotalReturnMutation,
} from "../../redux/slices/user/userApiSlice.js";

// Calculating total return once we've logged in

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  // we need stocksdata to display stocks list in portfolio
  const { data: stocksData } = useGetPortfolioStocksQuery(user);
  // Apply calculated total return to each owned stock
  const [setStocksTotalReturn, {}] = useSetPortfolioStocksTotalReturnMutation();

  // stats of the owned stocks
  const ownedStocksStats =
    stocksData &&
    stocksData.map((item) => ({
      symbol: item.symbol,
      qty: item.share,
      averageCost: item.averageCost,
    }));
  const calculateTotalReturn = async (company) => {
    // shouldn't be here, but just for now
    const api_key = `${process.env.REACT_APP_FINNHUB_API_KEY}`;
    const responseArray = await Promise.all(
      company.map((item) =>
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${api_key}`
        )
          .then((response) => response.json())
          .then((data) => ({
            oldPrice: item.averageCost,
            fullinfo: data,
            symbol: item.symbol,
            totalCost: item.qty * item.averageCost,
            currentPrice: data.c,
            totalReturn: item.qty * (data.c - item.averageCost),
            qty: item.qty,
          }))
      )
    );

    console.log(responseArray);

    if (responseArray.length > 0) {
      responseArray.map((item) => {
        console.log("Current Price:", item.currentPrice);
        return setStocksTotalReturn({
          totalReturn: item.totalReturn,
          symbol: item.symbol,
          stockPrice: item.currentPrice,
          share: item.qty,
        });
      });
    }
  };

  useEffect(() => {
    const check = async () => {
      if (ownedStocksStats && ownedStocksStats?.length > 0) {
        await calculateTotalReturn(ownedStocksStats);
      }
    };

    check();
  }, [ownedStocksStats?.length]);

  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;

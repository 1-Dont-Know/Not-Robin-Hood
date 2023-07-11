import connectDB from "../../config/database.js";

class PortfolioController {
  async getPortfolioStocks(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userId } = req.params;
    try {
      const query = "SELECT * FROM user_portfolio_stocks WHERE user_id = ?";
      const [rows] = await connection.query(query, [userId]);
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }

  async addPortfolioStock(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userID, id, symbol, stockPrice, company, share, totalCost, date } =
      req.body;
    console.log(
      userID,
      id,
      symbol,
      stockPrice,
      company,
      share,
      totalCost,
      date
    );
    const AVERAGE_COST = totalCost / share;
    const TOTAL_RETURN = 0;

    /*
    total cost = amount of stocks * the price it was purchased (e.x 06/01/23)
      total return = fetched new price * amount of stocks  - total cost
      
    
    */
    const EQUITY = Number(stockPrice * share).toFixed(2);
    const query =
      "SELECT * FROM user_portfolio_stocks WHERE user_id = ? AND symbol = ?";
    const [rows] = await connection.query(query, [userID, symbol]);
    const match = rows[0];
    console.log("Matched stock", match);
    if (match) {
      const newTotalCost = totalCost + match.totalCost;
      const newAverageCost = newTotalCost / (match.share + share);
      const newEquity = stockPrice * (match.share + share);
      const updatedShare = share;
      const updateStockQuery =
        "UPDATE user_portfolio_stocks SET share = share + ?, currentPrice = ?, totalCost = ?, averageCost = ?, purchased_at = ?, equity = ? WHERE user_id = ? AND id = ? AND symbol = ?";
      const [updateRows] = await connection.query(updateStockQuery, [
        updatedShare,
        stockPrice,
        newTotalCost,
        newAverageCost,
        date,
        newEquity,
        userID,
        match.id,
        symbol,
      ]);
      res.json(updateRows);
    }
    try {
      if (!match) {
        console.log("EQUITY", EQUITY);
        const query =
          "INSERT INTO user_portfolio_stocks (user_id, id, name, symbol, currentPrice, share, totalCost, averageCost, totalReturn, equity, purchased_at) VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)";
        const [rows] = await connection.query(query, [
          userID,
          id,
          company,
          symbol,
          stockPrice,
          share,
          totalCost,
          AVERAGE_COST,
          TOTAL_RETURN,
          EQUITY,
          date,
        ]);
        res.json(rows);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async modifyPortfolioStock(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userID, id, share, symbol, stockPrice, totalCost, date, company } =
      req.body;
    console.log(
      "Info for stock modification:",
      userID,
      id,
      share,
      symbol,
      stockPrice,
      totalCost
    );
    const query =
      "SELECT * FROM user_portfolio_stocks WHERE user_id = ? AND symbol = ?";
    const [rows] = await connection.query(query, [userID, symbol]);
    const match = rows[0];

    const EQUITY = stockPrice * share;
    // const newTotalCost = match.totalCost - totalCost;
    // console.log("Calculated total cost:", newTotalCost);

    // const oldTotalCost = match.totalCost;
    // const modifiedTotalCost = totalCost;
    // console.log("oldTotalCost", match.totalCost);
    // console.log("modifiedTotalCost", totalCost);
    console.log("temp", share);
    console.log("stockprice", stockPrice);
    console.log("totalcost:", totalCost);
    console.log("matched totalCost", match.totalCost);
    const newTotalCost = match.totalCost - totalCost;
    console.log("New Total Cost:", newTotalCost);
    const newAverageCost = isNaN(newTotalCost / share)
      ? 0
      : newTotalCost / share;

    console.log("New average cost:", newAverageCost);
    // const newEquity = stockPrice * share;
    // console.log("New equity:", newEquity);

    try {
      const query =
        "UPDATE user_portfolio_stocks SET share = ?, currentPrice = ?, totalCost = ?, averageCost = ?, purchased_at = ?, equity = ? WHERE user_id = ? AND id = ? AND symbol = ?";
      const [rows] = await connection.query(query, [
        share,
        stockPrice,
        newTotalCost,
        newAverageCost,
        date,
        EQUITY,
        userID,
        id,
        symbol,
      ]);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  }
  async deletePortfolioStock(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userID, id, symbol, company } = req.params;
    console.log("delete function called", userID, symbol, company);
    try {
      const query =
        "DELETE FROM user_portfolio_stocks WHERE user_id = ? AND symbol = ? AND name = ? LIMIT 1";
      const [rows] = await connection.query(query, [userID, symbol, company]);
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }

  async setTotalReturnValues(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { totalReturn, symbol, stockPrice, share } = req.body;
    console.log("stockPrice: ", stockPrice);
    console.log("shares: ", share);
    const newEquity = stockPrice * share;
    try {
      const query = `UPDATE user_portfolio_stocks SET totalReturn = ?, equity = ?, currentPrice = ?  WHERE symbol = ?`;
      const [rows] = await connection.query(query, [
        totalReturn,
        newEquity,
        stockPrice,
        symbol,
      ]);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PortfolioController();

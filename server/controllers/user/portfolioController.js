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
    const EQUITY = stockPrice * share;
    const query =
      "SELECT * FROM user_portfolio_stocks WHERE user_id = ? AND symbol = ?";
    const [rows] = await connection.query(query, [userID, symbol]);
    const match = rows[0];
    console.log("Matched stock", match);
    if (match) {
      const updatedShare = share;
      const updateStockQuery =
        "UPDATE user_portfolio_stocks SET share = share + ?, stockPrice = stockPrice + ?, totalCost = totalCost + ?, averageCost = (totalCost + ?) / (share + ?), purchased_at = ?, equity = equity + ? WHERE user_id = ? AND id = ? AND symbol = ?";
      const [updateRows] = await connection.query(updateStockQuery, [
        updatedShare,
        stockPrice,
        totalCost,
        totalCost,
        updatedShare,
        date,
        EQUITY,
        userID,
        match.id,
        symbol,
      ]);
      res.json(updateRows);
    }
    try {
      if (!match) {
        const query =
          "INSERT INTO user_portfolio_stocks (user_id, id, name, symbol, stockPrice, share, totalCost, averageCost, totalReturn, equity, purchased_at) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?)";
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
    const EQUITY = stockPrice * share;
    try {
      const query =
        "UPDATE user_portfolio_stocks SET share = ?, stockPrice = stockPrice - ?, totalCost = totalCost - ?, purchased_at = ?, equity = equity - ? WHERE user_id = ? AND id = ? AND symbol = ?";
      const [rows] = await connection.query(query, [
        share,
        stockPrice,
        totalCost,
        date,
        totalCost,
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
    const { totalReturn, symbol } = req.body;
    try {
      const query = `UPDATE user_portfolio_stocks SET totalReturn = ? WHERE symbol = ?`;
      const [rows] = await connection.query(query, [totalReturn, symbol]);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PortfolioController();

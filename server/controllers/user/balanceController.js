import connectDB from "../../config/database.js";

class BalanceController {
  async getBalance(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();

    const { userId } = req.params;

    try {
      // retrieve the user's balance from the database
      const [rows] = await connection.query(
        "SELECT balance FROM users WHERE id = ?",
        [userId]
      );

      // return the user's balance
      res.json({ balance: rows[0].balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async changeBalance(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    try {
      // extract the id and balance from the request
      const id = req.params.id;
      const { amount } = req.body;

      // update the balance in the database
      await connection.query(
        "UPDATE users SET balance = balance + ? WHERE id = ?",
        // "UPDATE users SET balance = (balance * 100 + ? * 100) / 100 WHERE id = ?",
        [amount, id]
      );

      // return a success response
      res.status(200).json({ message: "User balance updated successfully" });
    } catch (error) {
      // handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new BalanceController();

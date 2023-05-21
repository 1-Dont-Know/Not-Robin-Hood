import connectDB from "../../config/database.js";

class TransactionsController {
  async getTransactions(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();

    const { userId } = req.params;

    try {
      const [rows] = await connection.query(
        "SELECT * from user_transactions WHERE id = ?",
        [userId]
      );
      console.log(rows[0]);
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default new TransactionsController();

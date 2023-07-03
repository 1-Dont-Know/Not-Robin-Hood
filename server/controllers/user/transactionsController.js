import connectDB from "../../config/database.js";

class TransactionsController {
  async getTransactions(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();

    const { userId } = req.params;

    try {
      const [rows] = await connection.query(
        "SELECT * from user_transactions WHERE user_id = ?",
        [userId]
      );
      console.log(rows[0]);
      res.json({ data: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async updateTransactions(req, res, next) {
    const connection = await connectDB();
    const { userID, id, name, price, qty, amount, description, date } =
      req.body;
    console.log(
      "Transaction:",
      userID,
      id,
      name,
      price,
      qty,
      description,
      date
    );
    try {
      const query =
        "INSERT INTO user_transactions (user_id, id, name, price, qty, amount, description, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const [rows] = await connection.query(query, [
        userID,
        id,
        name,
        price,
        qty,
        amount,
        description,
        date,
      ]);
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default new TransactionsController();

import connectDB from "../../config/database.js";

class NotificationsController {
  async getNotifications(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();

    const { userId } = req.params;

    try {
      // retrieve the user's asset condition from the database
      const [rows] = await connection.query(
        "SELECT * FROM user_notifications WHERE user_id = ?",
        [userId]
      );

      // return the user's asset condition
      res.json({ data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default new NotificationsController();

import connectDB from "../../config/database.js";

class UserController {
  async getDetails(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();

    try {
      // extract the id from the request
      const id = req.params.id;

      // fetch the user data from the database
      const result = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      // return the user data
      res.status(200).json(result[0]);
    } catch (error) {
      // handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new UserController();

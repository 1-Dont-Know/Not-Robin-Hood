import connectDB from "../../config/database.js";

class AssetController {
  async getAsset(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userId } = req.params;
    try {
      // retrieve the user's asset value from the database
      const [rows] = await connection.query(
        "SELECT * FROM user_asset_value WHERE user_id = ?",
        [userId]
      );

      const assetValue = rows[0].value;
      const assetCondition = rows[0].condition;
      const assetPercentage = rows[0].percentage;

      // return the user's asset value
      res.json({
        value: assetValue,
        condition: assetCondition,
        percentage: assetPercentage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default new AssetController();

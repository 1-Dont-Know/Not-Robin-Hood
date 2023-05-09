import mysql from "mysql2/promise";

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Connected to PlanetScale!");
    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

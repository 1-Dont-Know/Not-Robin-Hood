import express from "express";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2";

// FOR WORKING WITH ENVIRONMENT VARIABLES
dotenv.config();

// CONNECTION TO OUR DATABASE
const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");
connection.end();

const port = process.env.PORT || 5500;

console.log(port);

// FRAMEWORK WE WILL USE FOR BUILDING OUR API
const app = express();

// TEMPORARY DATA TO SHOW
const user = {
  data: [
    {
      id: 1,
      name: "Jack",
    },
    {
      id: 2,
      name: "John",
    },
  ],
};

// DEFAULT ENDPOINT TO GET TEMPORARY DATA
app.get("/", (req, res) => {
  res.send(user);
});

// TO CHECK IF OUR APP US RUNNING AND ON WHICH PORT
app.listen(port, () => console.log(`Server is running on port ${port}`));

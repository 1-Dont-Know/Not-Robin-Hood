import express from "express";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cors from "cors";

// FOR WORKING WITH ENVIRONMENT VARIABLES
dotenv.config();

// CONNECTION TO OUR DATABASE
const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

const port = process.env.PORT || 5500;

// FRAMEWORK WE WILL USE FOR BUILDING OUR API
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json("WELCOME TO HOBIN ROOD APP SERVER");
});

//  GET REQUEST TO DISPLAY BALANCE
app.get("/balance", async (req, res) => {
  try {
    const query = "SELECT balance FROM Users;";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

// PUT REQUEST TO MODIFY OUR USER TABLE

app.put("/update", (req, res) => {
  const data = [10, "Neil", 1];
  connection.query(
    "UPDATE Users SET Balance = ?, Name=? WHERE id=?",
    data,
    (err, res) => {
      if (err) {
        res.send("ERROR");
      } else {
        res.send(res);
      }
    }
  );
});

// TO CHECK IF OUR APP US RUNNING AND ON WHICH PORT
app.listen(port, () => console.log(`Server is running on port ${port}`));

import express from "express";
import path from "path";

const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "client")));

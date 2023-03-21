const express = require("express");
const path = require("path");
const app = express();
const port = 5500;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

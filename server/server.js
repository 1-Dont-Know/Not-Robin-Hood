const express = require("express");
const path = require("path");
const app = express();
const port = 5500;

const data = {
  users: [
    {
      id: 1,
      name: "Jack",
    },
    {
      id: 2,
      name: "John",
    },
    {
      id: 3,
      name: "Mike",
    },
    {
      name: "test",
      id: 4,
    },
    {
      name: "ddd",
      id: 5,
    },
    {
      name: "gggg",
      id: 6,
    },
    {
      name: "dddd",
      id: 7,
    },
    {
      name: "!!!!",
      id: 8,
    },
    {
      name: "aaaaa",
      id: 9,
    },
  ],
};
app.get("/", (req, res) => {
  res.send(data);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

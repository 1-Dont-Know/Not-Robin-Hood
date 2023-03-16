const express = require("express");
const path = require("path");
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "client")));
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

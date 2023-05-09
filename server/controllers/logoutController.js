import connectDB from "../config/database.js";
import jwt from "jsonwebtoken";

const handleLogout = async (req, res) => {
  const connection = await connectDB();
  // dont forget on client also delete accessToken!

  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204); // no content to send back
  const refreshToken = cookies.jwt;
  //   is refresh token in DB?
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE JSON_CONTAINS(refreshToken, ?)",
    [`"${refreshToken}"`]
  );
  const foundUser = rows[0];
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
    }); // on production add secure: true, sameSite: "None" flags
    return res.sendStatus(204);
  }

  //   Delete a refreshToken in DB
  // update the foundUser object to remove the refreshToken

  const result = await connection.query(
    "UPDATE users SET refreshToken = JSON_REMOVE(refreshToken, ?) WHERE id = ?",
    [`$[${foundUser.refreshToken.indexOf(refreshToken)}]`, foundUser.id]
  );
  console.log(result[0]);
  res.clearCookie("jwt", { httpOnly: true }); // on production add secure: true, sameSite: "None" flags
  res.sendStatus(204);
};

export default handleLogout;

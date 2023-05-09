import connectDB from "../config/database.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  const connection = await connectDB();

  // Receive refresh token from the cookie, that, we send to the client (browser)
  const cookies = req.cookies;
  // If there's no cookie, we send unauthorized
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

  // If cookie exist, we want to get refresh token from that cookie
  const refreshToken = cookies.jwt;

  // we need to delete cookie, after we receive it as we are going to send a new one
  // res.clearCookie("jwt", { httpOnly: true, sameSite: "None" }); // on production add flag secure: true

  // searching for the user, that has a refreshToken we received
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE JSON_CONTAINS(refreshToken, ?)",
    [`"${refreshToken}"`]
  );
  const foundUser = rows[0];
  // If we did not find a user, but  we did receieve a refresh token, means, refreshToken doesn't exist anymore, it was used and deleted.
  // We did have a cookie, but we didn't find a user in DB
  //   Detected refresh token reuse!
  if (!foundUser) {
    //
    // jwt.verify(
    //   refreshToken,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   async (error, decoded) => {
    //     // if can't be decoded, it was expired
    //     if (error) return res.sendStatus(403); // Forbidden
    //     // looking for compromised user
    //     const [rows] = await connection.query(
    //       "SELECT * FROM users WHERE id = ?",
    //       [decoded.id]
    //     );
    //     const compromisedUser = rows[0];
    //     // cleaning refreshToken array in DB of the compromised user
    //     const result = await connection.query(
    //       "UPDATE users SET refreshToken = JSON_ARRAY() WHERE id = ?",
    //       [compromisedUser.id]
    //     );
    //     console.log(result[0]);
    //   }
    // );
    return res.sendStatus(403); // Forbidden
  }

  // let newRefreshTokenArray = foundUser.refreshToken.filter(
  //   (rt) => rt !== refreshToken
  // );

  // evaluate jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      // we've received a token, but it was expired
      // if (error) {
      //   console.log("expired refresh token");
      //   // foundUser.refreshToken = [...newRefreshTokenArray];
      //   const result = await connection.query(
      //     "UPDATE users SET refreshToken = ? WHERE id = ?",
      //     [JSON.stringify([...newRefreshTokenArray]), foundUser.id]
      //   );
      //   console.log(result[0]);
      // }
      if (error || foundUser.id !== decoded.userId) return res.sendStatus(403); // Forbidden

      // refresh token was still valid
      const accessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY }
      );

      // new refresh token will be sent whenever a new access token was created and sent
      const refreshToken = jwt.sign(
        {
          userId: foundUser.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );
      //   Saving refresh token with current user
      // const currentUserToken = [...newRefreshTokenArray, newRefreshToken];
      // const result = await connection.query(
      //   "UPDATE users SET refreshToken = ? WHERE id = ?",
      //   [JSON.stringify(currentUserToken), foundUser.id]
      // );
      // console.log(result[0]);
      // after we sent new tokens, we are setting new cookie with new refresh token
      // res.cookie("jwt", newRefreshToken, {
      //   httpOnly: true,
      //   sameSite: "None",
      //   maxAge: 24 * 60 * 60 * 1000,
      // }); // in production add secure: true flag
      res.json({ accessToken });
    }
  );
};

export default handleRefreshToken;

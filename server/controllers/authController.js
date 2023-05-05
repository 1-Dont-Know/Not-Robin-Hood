import connectDB from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
  const connection = await connectDB();

  // define cookies, as there could be an exisiting cookies
  const cookies = req.cookies;
  // console.log(`cookies available at logn: ${JSON.stringify(cookies)}`);
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const foundUser = rows[0];
  if (!foundUser.email === email) return res.sendStatus(401); // Unauthorized
  //   Evaluate the password
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.sendStatus(401).json({ message: "Incorrect password" });
  }
  if (match) {
    // create a JWTs
    // Access Token
    const accessToken = jwt.sign(
      { userId: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      }
    );
    // Refresh Token
    const refreshToken = jwt.sign(
      {
        userId: foundUser.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    // let newRefreshTokenArray = !cookies.jwt
    //   ? foundUser.refreshToken
    //   : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    // if we have an old cookie, we will remove it
    // if (cookies?.jwt) {
    //   res.clearCookie("jwt", { httpOnly: true }); // in production put flag "secure:" true, sameSite: "None"
    // }

    // const foundUserRefreshToken = [...newRefreshTokenArray, newRefreshToken];
    // const result = await connection.query(
    //   "UPDATE users SET refreshToken = JSON_MERGE_PRESERVE(refreshToken, JSON_ARRAY(?)) WHERE id = ?",
    //   [foundUserRefreshToken, foundUser.id]
    // );
    const result = await connection.query(
      "UPDATE users SET refreshToken = JSON_MERGE_PRESERVE(refreshToken, JSON_ARRAY(?)) WHERE id = ?",
      [refreshToken, foundUser.id]
    );

    console.log(result);

    //   /*
    //         Scenario added here:
    //         1) User logs in but never uses RT and does not logout
    //         2) RT is stolen
    //         3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    //     */
    //   const refreshToken = cookies.jwt;
    //   const [rows] = await connection.query(
    //     "SELECT * FROM users WHERE refreshToken = ?",
    //     [refreshToken]
    //   );
    //   const foundToken = rows[0].refreshToken;
    //   console.log("Found Token:", foundToken);
    //   //   Detected refresh token reuse
    //   if (!foundToken) {
    //     console.log("attempted refresh token reuse at login!");
    //     // clear out all previous refresh tokens
    //     newRefreshTokenArray = [];
    //   }

    // Saving refresh token with current user
    // foundUser.refreshToken.push(newRefreshToken);
    // const result = await connection.query(
    //   "UPDATE users SET refreshToken = JSON_ARRAY_APPEND(refreshToken, '$', ?) WHERE id = ?",
    //   [refreshToken, foundUser.id]
    // );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    }); // in production put flag "secure:" true

    // send acces token to user
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;

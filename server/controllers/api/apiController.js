import connectDB from "../../config/database.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

class ApiController {
  async registration(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    // Constants for creating new user, most probably will be changed in future
    const DEFAULT_BALANCE = 0;
    const DEFAULT_PHONE = 0;
    const REFRESH_TOKEN = [];
    // Getting credentials from our client, why not :D
    const { name, email, password } = req.body;

    //   Found some express validator with good feedbacks, decided to apply to our registration form validation
    body("name").trim().notEmpty().withMessage("Name is required."),
      body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email address.")
        .normalizeEmail({ gmail_remove_dots: false }),
      body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters.");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //   We will not be able to register without provided email / password  / name :)
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Name, email and password are requried." });
    }

    // Before registering new user, we should check if there's a registered user with existing email in our database
    const user = await connection.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    //   Once we found a duplicate, we will send a response with status code 409 and a message
    //   HTTP 409 error status: The HTTP 409 status code (Conflict) indicates that the request could not be processed because of conflict in the request
    if (user[0].length) {
      return res.sendStatus(409).json({ message: "Email already exists." });
    }
    // Let's get started with creating a new user in our database
    try {
      // Adding some salt to our password soup :D
      // Hashing combined with salts protects you against rainbow table attacks!
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create and store new user
      const result = await connection.query(
        "INSERT INTO users (name, email, password, balance, phone, refreshToken) VALUES (?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          hashedPassword,
          DEFAULT_BALANCE,
          DEFAULT_PHONE,
          JSON.stringify(REFRESH_TOKEN),
        ]
      );
      // Set default asset value of the new user

      const userId = result[0].insertId;
      await connection.query(
        "INSERT INTO user_asset_value (user_id, value, condition, percentage) VALUES (?, ?, ?, ?)",
        [userId, 0, "default", 0]
      );

      res.status(201).json({ message: "User successfully registered." });
      await connection.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    // define cookies, as there could be an exisiting cookies
    const cookies = req.cookies;
    // console.log(`cookies available at logn: ${JSON.stringify(cookies)}`);
    const { email, password } = req.body;
    try {
      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
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
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res, next) {
    const connection = await connectDB();
    // dont forget on client also delete accessToken!

    const cookies = req.cookies;
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(req, res, next) {
    const connection = await connectDB();
    // Receive refresh token from the cookie, that, we send to the client (browser)
    const cookies = req.cookies;
    // If there's no cookie, we send unauthorized
    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

    // If cookie exist, we want to get refresh token from that cookie
    const refreshToken = cookies.jwt;
    try {
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
          if (error || foundUser.id !== decoded.userId)
            return res.sendStatus(403); // Forbidden

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
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(req, res, next) {
    const connection = await connectDB();
    const { userID, newPassword, oldPassword } = req.body;
  
    try {
      const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [userID]);
      const foundUser = rows[0];
      if (!foundUser || foundUser.id !== userID) {
        return res.sendStatus(401); // unauthorized
      }
      const match = await bcrypt.compare(oldPassword, foundUser.password);
      if (!match) {
        return res.status(401).json({ message: "Please enter correct old password" });
      }
      const query = "UPDATE users SET password = ? WHERE id = ?";
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      await connection.query(query, [hashedNewPassword, userID]);
      res.status(201).json({ message: "Password successfully updated." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async changeName(req, res, next) {
    const connection = await connectDB();
    const { userID, oldName, newName } = req.body;

    try{
      const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [userID]);
      const foundUser = rows[0];
      if (!foundUser || foundUser.id !== userID) {
        return res.sendStatus(401); // unauthorized
      } 
      console.log("found = " + foundUser.name)
      console.log("oldname = " + oldName)

      if(!foundUser || foundUser.name !== oldName){
        console.log("old names are not the same")
        return res.status(401).json({ message: "Please enter correct old name" });
      }
      const query = "UPDATE users SET name = ? WHERE id = ?";
      await connection.query(query, [newName, userID]);
      res.status(201).json({ message: "Name successfully updated." });
    }catch (error) {
      res.status(500).json({ message: error.message });
    }

    // testing if name changes
    // console.log("new name ----------------- ")
    // try{
    //   const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [userID]);
    //   const foundUser2 = rows[0];
    //   console.log(foundUser2)
    // }catch (error){
    //   console.log("found user name")
    // }
  } 
}

export default new ApiController();

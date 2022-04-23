const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const client = require("../mongodb");

require("dotenv").config();

//create table users
// client.query(`CREATE TABLE users (id SERIAL, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, role VARCHAR(15) NOT NULL, PRIMARY KEY ("id"))`, (err, res) => {
//     if(!err) {
//         console.log("res : ", res.rows);
//     } else {
//         console.log(err);
//     }
// })

// delet users
// client.query('DELETE FROM "users" WHERE "name" = $1', [userName]); // sends queries

// Sign up
router.post(
  "/signup",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { name, email, password, role } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // get users
    await client.query(`Select * from users`, (err, result) => {
      if (result) {
        // Validate if user already exists
        let user = result.rows.find((user) => {
          return user.email === email;
        });

        if (user) {
          return res.status(200).json({
            errors: [
              {
                email: user.email,
                msg: "The user already exists",
              },
            ],
          });
        }
        return result.rows;
      } else {
        console.log(err.message);
      }
    });

    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save email and password to database/array
    if (req.body) {
      const query = `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)`;
      let params = [name, email, hashedPassword, role];
      await client.query(query, params, async (err, result) => {
        if (err) {
          console.error(err);
          return;
        } else {
          // Do not include sensitive information in JWT
          const accessToken = await JWT.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1m",
            }
          );

          res.json({
            accessToken,
            result: result.rows,
          });

          console.log("Data insert successful");
          return result;
        }
      });
    }
  }
);

// Get all users
router.get("/users", async (req, res) => {
  client.query(`Select * from users`, (err, result) => {
    if (res) {
      const response = result.rows;
      res.json({
        response,
      });
      return result.rows;
    } else {
      console.log(err.message);
    }
    client.end;
  });
});

// Log in
router.post("/login", async (req, res) => {
  let user = {};
  const { name, email, password, role } = req.body;
 
  // get user
  await client.query(`Select * from users`, async (err, result) => {
    if (result) {
      // Look for user email in the database
      user = result.rows.find((user) => {
        return user.email === email;
      });
      
      // Compare hased password with user password to see if they are valid
      let isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          errors: [
            {
              msg: "Email or password is invalid",
            },
          ],
        });
      }

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }
      return ;
    } else {
      console.log(err.message);
    }
    client.end;
  });

  //  Send JWT access token
  const accessToken = await JWT.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );

  // Refresh token
  const refreshToken = await JWT.sign(
    { email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  // Set refersh token in refreshTokens array
  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
});

let refreshTokens = [];

// Create new access token from refresh token
router.post("/token", async (req, res) => {
  const refreshToken = req.header("x-auth-token");

  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const { email } = user;
    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
});

// Deauthenticate - log out
// Delete refresh token
router.delete("/logout", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

module.exports = router;

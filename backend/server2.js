require('dotenv/config')
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const app = express();
const PORT = 5000;

const mysql2 = require("mysql2");

// dotenv.config();
// MySQL Connection
const connection = mysql2.createConnection({
  host: "localhost",
  user: "cfcassola",
  password: "password",
  database: "philosophical_vision",
});

const jwt = require("jsonwebtoken");

// jwt secret — store this JWT secret in your .env file
const JWT_SECRET = process.env.JWT_SECRET;
console.log("🚀 - JWT_SECRET:", JWT_SECRET)


const client = new OAuth2Client();
// API for Google Authentication
app.post("/google-auth", async (req, res) => {
  console.log("hello i'm here");
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if the user exists in your database
    connection.query("SELECT * FROM users WHERE email = ?", [email], (error, results, fields) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      let user = results[0];
      console.log("🚀 - user:", user)


      if (!user) {
        // Create a user if they do not exist
        connection.query("INSERT INTO users (email, name, authSource) VALUES (?, ?, ?)", [email, payload.name, "google"], (error, results, fields) => {
          if (error) {
            console.error("Error inserting user into database:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          user = { id: results.insertId, email, name: payload.name, authSource: "google" };
          generateAndSendToken(user);
        });
      } else {
        generateAndSendToken(user);
      }
    });
  } catch (err) {
    console.error("Error verifying Google token:", err);
    res.status(400).json({ error: "Bad Request" });
  }
});

function generateAndSendToken(user) {
  const token = jwt.sign({ user }, JWT_SECRET);
  res.status(200).cookie("token", token, { http: true }).json({ user });
}

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));

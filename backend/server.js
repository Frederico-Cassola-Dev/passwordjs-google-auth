const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Connection
const connection = mysql2.createConnection({
  host: "localhost",
  user: "cfcassola",
  password: "password",
  database: "philosophical_vision",
});

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Replace with your actual Google OAuth client ID

const client = new OAuth2Client(CLIENT_ID);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

// Verify Google token
async function verifyToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    console.log("🚀 - ticket:", ticket);

    const payload = ticket.getPayload();
    console.log("🚀 - payload:", payload);

    return payload;
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}

// Google authentication route
app.get("/auth/google", async (req, res) => {
  const { token } = req.query;
  console.log("🚀 - token:", token)

  const payload = await verifyToken(token);
  console.log("🚀 - payload:", payload);

  if (payload) {
    // Check if user exists in your database, if not, create new user entry
    const user = {
      googleId: payload.sub,
      displayName: payload.name,
      email: payload.email,
    };
    console.log("🚀 - user:", user);

    connection.query("INSERT INTO users SET ?", user, (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json({ message: "User inserted successfully", user });
    });
  } else {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

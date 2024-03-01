const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");

//* GET users listing.

router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1:5000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  );

  const authorizedUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizedUrl });
});

module.exports = router;

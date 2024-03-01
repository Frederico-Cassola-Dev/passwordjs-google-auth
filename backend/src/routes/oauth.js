const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  const data = await response.json();
  console.log("data", data);
}

//* GET home page.

router.get("/", async function (req, res, next) {
  const code = req.query.code;
  console.log("🚀 - code:", code);
  try {
    const redirectUrl = "http://127.0.0.1:5000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );

    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    console.log("Tokens acquired");
    const user = oAuth2Client.credentials;
    console.log("🚀 - user:", user);
    await getUserData(oAuth2Client.credentials.access_token);
    res.send({data: user})
  } catch (err) {
    console.log("Error with signing with Google ==> ", err);
  }

  // res.redirect(303, 'http://localhost:3000/');
});

module.exports = router;
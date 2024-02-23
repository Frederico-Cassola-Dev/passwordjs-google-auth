// Load the express module to create a web application

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");
const router = require("./router");

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://127.0.0.1:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

module.exports = app;

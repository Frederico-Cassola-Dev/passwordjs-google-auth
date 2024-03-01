// Load the express module to create a web application
// require("./routes/index");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/oauth")
const requestRouter = require("./routes/requests")


const app = express();
const cors = require("cors");
// const router = require("./router");
// var indexRouter = require("./routes/index");
// var authRouter = require("./routes/auth");

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://127.0.0.1:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use("/api", router);
app.use("/oauth", authRouter);
app.use("/request", requestRouter);


module.exports = app;

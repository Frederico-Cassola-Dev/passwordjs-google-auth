// Importing all required libraries
require("dotenv").config();
const express = require("express")
const cors = require("cors")
const db = require("./database/db.js")
const session = require("express-session")
const passport = require("passport")

// creating our app using express
const app = express()

// Setting PORT
const PORT = process.env.APP_PORT || 5000;

// CORS - Cross Origin Resource Sharing, our Frontend will be running on a different port (3000) and our Backend will run on 5000, so how can the frontend access the backend? That's the reason we are using CORS.
app.use(cors({
    origin: "http://localhost:3000",  // Only localhost:3000 can access this server
    credentials: true  // Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. 
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Adding required middlewares
app.use(session({
    secret: "askduhakdnkbiygvhbad7a6s*&^*S^D8asdbk", // You should replace this with a more secure secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24*60*60*1000 // 24 hours
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Adding Route, "/auth" is going to be a prefix for all the routes which are in ./router/auth/passport
app.use('/auth', require('./src/Routers/auth/passport.js'));

// Connecting to MySQL Database
db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connection to the database is successful")
})

// Starting our port... 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// This is version 2 of my ecommerce api
// It uses passport local for authentification and has session storage on the database with a cart and recent activity array, 
// (so that the user only has to login for checkout but can still add items to their cart and see which products they recently selected whithout login in),
// It also has a results path for search that can take in a limit (to filter how many results will be returned), and filters like max and min price, and brand.


// To add products to the database you must be admin, to create a new user -> POST /api/user/add and populate the request body with the necessary info e.g name.first, email etc...
// be sure to populate the request body with 'admin:true' as it is set to false by default.
// then login -> POST /api/user/login  and populate the request body with the email you created the account with and password.
// You can then add products to the database if you're logged in as user. You can also just comment out the middleware that ensures you're logged-in at /routes/user.
// You're good to go


//Import all the necessary modules
require("dotenv").config()
require("./config/database")
const express = require("express"),
session = require("express-session"),
sessionConfig = require("./config/session"),
passport = require("passport")
const server = express()

//To be able to read the request body
server.use(express.json())
server.use(express.urlencoded({extended:true}))

//initiate session using session config
server.use(session(sessionConfig))

//initiate passport
require("./config/passport")
server.use(passport.initialize())
server.use(passport.session())

//use router at /routes/index.js
server.use(require("./routes"))

//initiate server
server.listen(process.env.SERVER_PORT, () => console.log(`Listening on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`))
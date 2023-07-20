require("dotenv").config()
require("./config/database")
const express = require("express"),
session = require("express-session"),
sessionConfig = require("./config/session"),
passport = require("passport")
const server = express()

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(session(sessionConfig))
require("./config/passport")
server.use(passport.initialize())
server.use(passport.session())
server.use(require("./routes"))

server.listen(process.env.SERVER_PORT, () => console.log(`Listening on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`))
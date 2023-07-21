require("dotenv").config()
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")

//session lifespan (in s)
const sessionDuration = 24*60*60

//session config
const session = {
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create(
        {
            mongoUrl:process.env.DB_URL,
            mongooseConnection:mongoose.connection,
            ttl: sessionDuration,
            collectionName:"sessions"
        },
    ),
    cookie:{
        //cookie lifespan (in ms)
        maxAge:sessionDuration * 1000
    }
}
module.exports = session
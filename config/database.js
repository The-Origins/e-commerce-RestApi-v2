require("dotenv").config()
const mongoose = require("mongoose"),
productSchema = require("../schemas/product"),
userSchema = require("../schemas/user")


const connection = mongoose.createConnection(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
connection.on("error", (err) => console.error(err))
connection.once("open", () => console.log('Database started'))

connection.model("User", userSchema, "users")
connection.model("Product", productSchema, "products")

module.exports = connection
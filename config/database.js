//import all the required modules
require("dotenv").config()
const mongoose = require("mongoose"),
productSchema = require("../schemas/product"),
userSchema = require("../schemas/user")

//initiate the database connection to the DB_URL saved in .env
const connection = mongoose.createConnection(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
connection.on("error", (err) => console.error(err))
connection.once("open", () => console.log('Database started'))

//Define the connection models using the schemas in /shemas
//Typically people define the models in the schema file instead, however I found this was better since I needed to import the schemas into other schemas
connection.model("User", userSchema, "users")
connection.model("Product", productSchema, "products")

//export the connection
module.exports = connection
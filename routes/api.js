const router = require("express").Router()

//use the assosiated routers for each route
router.use("/user", require("./user"))
router.use("/product", require("./product"))
router.use("/cart", require("./cart"))
router.use("/results", require("./results"))
router.use("/recent", require("./recent"))

module.exports = router
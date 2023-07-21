const router = require("express").Router()

//get the recent session activity array
router.get("/", require("../controllers/recent/getRecent"))

//update the recent session activity array
//this is done automatically when you GET /api/product/:id but incase you need to manually do it you can -> POST /api/recent/add
router.post("/add", require("../controllers/recent/addRecent"))

module.exports = router
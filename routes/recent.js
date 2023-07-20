const router = require("express").Router()


router.get("/", require("../controllers/recent/getRecent"))
router.post("/add", require("../controllers/recent/addRecent"))
module.exports = router
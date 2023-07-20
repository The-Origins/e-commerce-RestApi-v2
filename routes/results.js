const router = require("express").Router()


router.get("/", require("../controllers/results/getResults"))

module.exports = router
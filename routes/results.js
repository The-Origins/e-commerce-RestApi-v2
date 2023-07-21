const router = require("express").Router()

//return results for the users search
router.get("/", require("../controllers/results/getResults"))

module.exports = router
const router = require("express").Router()

router.get("/:id", require("../controllers/product/getProduct"))
router.post("/add", require("../controllers/middleware/isAdmin"), require("../controllers/product/addProduct"))
router.patch("/update/:id", require("../controllers/middleware/isAdmin"), require("../controllers/product/updateProduct"))
router.delete("/delete/:id", require("../controllers/middleware/isAdmin"), require("../controllers/product/deleteProduct"))

module.exports = router
const router = require("express").Router()


router.get("/", require("../controllers/cart/getCart"))
router.post("/add", require("../controllers/cart/addCartItem"))
router.patch("/update", require("../controllers/cart/updateCartItem"))
router.delete("/delete", require("../controllers/cart/deleteCartItem"))

module.exports = router
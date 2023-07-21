const router = require("express").Router()

//If the user is authenticated cart will update the users cart else it will update the session cart
//once the user logs in the session cart is emptied

//use the respective controllers for each route
router.get("/", require("../controllers/cart/getCart"))
router.post("/add", require("../controllers/cart/addCartItem"))
router.patch("/update", require("../controllers/cart/updateCartItem"))
router.delete("/delete", require("../controllers/cart/deleteCartItem"))

module.exports = router
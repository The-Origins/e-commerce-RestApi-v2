const passport = require("passport")
const router = require("express").Router()


router.get("/",require("../controllers/user/getUser"))
router.post("/add", require("../controllers/user/addUser"))
router.post("/login", require("../controllers/middleware/cart"), passport.authenticate("local", {failureRedirect:"/api/user/login-faliure"}), require("../controllers/user/updateUserCart"))
router.get("/login-success", require("../controllers/login/success"))
router.get("/login-faliure", require("../controllers/login/faliure"))
router.get("/logged-out", require("../controllers/logout/loggedOut"))
router.patch("/update/:id", require("../controllers/user/updateUser"))
router.delete("/delete/:id", require("../controllers/user/deleteUser"))
router.delete("/logout", require("../controllers/logout/logout"))

module.exports = router
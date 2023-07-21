const passport = require("passport")
const router = require("express").Router()

//return the currently logged in user infomation
router.get("/", require("../controllers/middleware/isAuthenticated") ,require("../controllers/user/getUser"))

//register a new user
router.post("/add", require("../controllers/user/addUser"))

//login a user
//on login passport seems to clear out any data stored in the session such as cart and recent
//so I use a middleware to pass on the data from the session before login in 
router.post("/login", require("../controllers/middleware/cart"), passport.authenticate("local", {failureRedirect:"/api/user/login-faliure"}), require("../controllers/user/updateUserCart"))

//route for a successfull login
router.get("/login-success", require("../controllers/login/success"))

//route for an unsuccessfull login
router.get("/login-faliure", require("../controllers/login/faliure"))

//route for once you're logged out
router.get("/logged-out", require("../controllers/logout/loggedOut"))

//update current user information (you must be logged in)
router.patch("/update", require("../controllers/middleware/isAuthenticated"), require("../controllers/user/updateUser"))

//update current user password (you must be logged in (for now))
router.patch("/update/password", require("../controllers/middleware/isAuthenticated"), require("../controllers/user/updateUserPassword"))

//deactivate the current user (you must be logged in)
router.delete("/deactivate", require("../controllers/middleware/isAuthenticated"), require("../controllers/user/deactivateUser"))

//logout current user (you must be logged in)
router.delete("/logout", require("../controllers/middleware/isAuthenticated"), require("../controllers/logout/logout"))

module.exports = router
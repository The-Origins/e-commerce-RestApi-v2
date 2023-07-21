const router = require("express").Router()

//initiate session cart and recent activity array
router.use("/", (req, res, next) =>
{
    if(!req.session.cart)
    {
        req.session.cart = {
            items:[],
            total:0
        }
    }
    if(!req.session.recent)
    {
        req.session.recent = []
    }
    next()
})

//use router at ./api
router.use("/api", require("./api"))

//all routes that don't exist
router.all("*", (req, res, next) =>
{
    //res.code is used by the error handler to send out the correct code during an error
    res.code = 404
    next(new Error(`Cannot ${req.method} ${req.url}`))
})

//use error handler for all errors
router.use(require("../controllers/middleware/errorHandler"))

module.exports = router

const router = require("express").Router()

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
router.use("/api", require("./api"))

router.all("*", (req, res, next) =>
{
    next(new Error(`Cannot ${req.method} ${req.url}`))
})
router.use(require("../controllers/middleware/errorHandler"))

module.exports = router
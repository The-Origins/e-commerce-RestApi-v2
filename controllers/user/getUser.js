const Product = require("../../config/database").models.Product

const getUser = (req, res, next) =>
{
    if(req.isAuthenticated())
    {
        res.json({success:true, data:req.user, message:`returned user ${req.user.name.first}`})
    }
    else
    {
        res.code = 401
        next(new Error("No user"))
    }
}

module.exports = getUser

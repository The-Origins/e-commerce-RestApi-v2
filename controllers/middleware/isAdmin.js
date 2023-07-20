module.exports = (req, res, next) =>
{
    if(req.isAuthenticated()&&req.user.admin)
    {
        next()
    }
    else
    {
        res.code = 401
        next(new Error("Unauthorized"))
    }
}
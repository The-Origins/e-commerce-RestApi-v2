module.exports = (req, res, next) =>
{
    if(req.isAuthenticated())
    {
        next()
    }
    else
    {
        res.code = 401
        next(new Error("Unauthorized"))
    }
}
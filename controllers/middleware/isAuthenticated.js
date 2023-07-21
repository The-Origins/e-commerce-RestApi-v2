module.exports = (req, res, next) =>
{
    //checks if user is authenticated
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
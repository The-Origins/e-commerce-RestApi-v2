module.exports = (req, res, next) =>
{
    //checks if user is authenticated and if admin is true
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
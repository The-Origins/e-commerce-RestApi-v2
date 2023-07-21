module.exports = (req, res, next) => {
    //logs the user out and redirects to /api/user/logged-out
    req.logOut((err) =>
    {
        if(err)
        {
            next(err)
        }
        res.redirect("/api/user/logged-out")
    })
}
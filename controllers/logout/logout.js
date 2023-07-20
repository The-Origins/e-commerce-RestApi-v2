module.exports = (req, res, next) => {
    req.logOut((err) =>
    {
        if(err)
        {
            next(err)
        }
        res.redirect("/api/user/logged-out")
    })
}
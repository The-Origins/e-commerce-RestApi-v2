module.exports = (req, res, next) =>
{
    req.session.recent = res.recent
    let ids = []
    if(res.cart.items.length)
    {
        for(let item in req.user.cart.items)
        {
            ids = [...ids, String(req.user.cart.items[item].product._id)]
        }
        for(let item in res.cart.items) 
        {
            if(!ids.includes(String(res.cart.items[item].product._id)))
            {
                req.user.cart.items = [...req.user.cart.items, res.cart.items[item]]
            }
        }
    }
    req.user.save()
    .then(() => {
        res.redirect("/api/user/login-success")
    })
    .catch((err) => next(err))
}
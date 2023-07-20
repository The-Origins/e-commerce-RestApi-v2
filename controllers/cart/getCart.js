const getCart = (req, res, next) =>
{
    if(req.isAuthenticated())
    {
        req.user.save()
        .then((user) =>
        {
            res.json({success:true, data:user.cart, message:`fetched ${user.name.first}'s cart`})
        })
        .catch((err) => next(err))
    }
    else
    {
        res.json({success:true, data:req.session.cart, message:`fetched session's cart`})
    }
}
module.exports = getCart
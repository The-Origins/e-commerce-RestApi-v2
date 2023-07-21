const getCart = (req, res, next) =>
{
    //check if the user is logged in
    if(req.isAuthenticated())
    {
        //update the user before returning it
        req.user.save()
        .then((user) =>
        {
            res.json({success:true, data:user.cart, message:`fetched ${user.name.first}'s cart`})
        })
        .catch((err) => next(err))
    }
    else
    {
        //return the sessions cart
        res.json({success:true, data:req.session.cart, message:`fetched session's cart`})
    }
}
module.exports = getCart
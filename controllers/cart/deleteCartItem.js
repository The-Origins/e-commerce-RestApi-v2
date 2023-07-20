const deleteCart = (req, res, next) =>
{
    let cartTotal = 0
    let item = req.body.item
    if(req.body.item)
    {
        if(item.product)
        {
            if(req.user)
            {
                for(let i in req.user.cart.items)
                {
                    if(String(req.user.cart.items[i].product._id) === String(item.product._id))
                    {
                        req.user.cart.items.splice(i, 1)
                    }
                }
                req.user.save()
                .then((user) =>
                {
                    res.json({success:true, data:user, message:`Updated cart for user: ${user.name.first}`})
                })
                .catch((err) => next(err))
            }
            else
            {
                for(let i in req.session.cart.items)
                {
                    if(String(req.session.cart.items[i].product._id) === String(item.product._id))
                    {
                        req.session.cart.items.splice(i, 1)
                    }
                }
                for(item  in req.session.cart.items)
                {
                    cartTotal += req.session.cart.items[item].total
                }
                req.session.cart.total = cartTotal
                res.json({success:true, data:req.session.cart, message:`Updated cart for session`})
            }
        }
    }
}
module.exports = deleteCart
const addCartItem = (req, res, next) =>
{
    let cartTotal = 0
    let item = req.body.item
    let date = new Date()
    if(item)
    {
        if(item.product&&item.quantity)
        {
            if(req.user)
            {
                req.user.cart.items = [...req.user.cart.items, item]
                req.user.save()
                .then((user) => res.json(res.json({success:true, data:user, message:`Updated cart for user: ${user.name.first}`})))
                .catch((err) => next(err))
            }
            else
            {
                item.createdAt = date.toISOString(Date.now())
                item.updatedAt = date.toISOString(Date.now())
                item.total = item.product.unitPrice.amount * item.quantity
                req.session.cart.items = [...req.session.cart.items, item]
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
module.exports = addCartItem
const User = require("../../config/database").models.User
const updateCart = (req, res, next) =>
{
    let cartTotal = 0
    if(req.body.item)
    {
        let date = new Date()
        let item = req.body.item
        if(item.product&&item.quantity)
        {
            if(req.isAuthenticated())
            {
                for(let i in req.user.cart.items)
                {
                    if(String(req.user.cart.items[i].product._id) === String(item.product._id))
                    {
                        for(let property in item)
                        {
                            if(property !== "product")
                            {
                                req.user.cart.items[i][property] = item[property]
                            }
                        }
                    }
                }
                req.user.save()
                .then((user) =>
                {
                    return res.json({success:true, data:user, message:`Updated cart for user: ${user.name.first}`})
                })
                .catch((err) => next(err))
            }
            else
            {
                for(let i in req.session.cart.items)
                {
                    if(String(req.session.cart.items[i].product._id) === String(item.product._id))
                    {
                        for(let property in item)
                        {
                            req.session.cart.items[i][property] = item[property]
                        }
                        req.session.cart.items[i].total = req.session.cart.items[i].quantity * req.session.cart.items[i].product.unitPrice.amount
                        req.session.cart.items[i].updatedAt = date.toISOString(Date.now())
                    }
                }
                for(item  in req.session.cart.items)
                {
                    cartTotal += req.session.cart.items[item].total
                }
                req.session.cart.total = cartTotal
                return res.json({success:true, data:req.session.cart, message:`Updated cart for session`})
            }
        }
    }
}
module.exports = updateCart
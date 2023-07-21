const User = require("../../config/database").models.User
const updateCart = (req, res, next) =>
{
    let cartTotal = 0
    if(req.body.item)
    {
        // The syntax for the request body is
        // {
        //     "item":{
        //         "product":{ ...product},
        //         "quantity":Number,
        //         "variant":"" -> this is omited for products without variants
        //         "total": -> this one is generated automatically and can be excluded
        //     }
        // }

        //data for the sessions cart
        let date = new Date()
        let item = req.body.item
        if(item.product&&item.quantity)
        {

            //check if user is logged in
            if(req.isAuthenticated())
            {
                //update the property if its not equals to product
                //You have
                for(let i in req.user.cart.items)
                {
                    if(String(req.user.cart.items[i].product._id) === String(item.product._id))
                    {
                        //update the varaint and quantity of the item
                        //variant = undefined if the item doesnt have a varaint
                        req.user.cart.items[i].quantity = item.quantity
                        req.user.cart.items[i].variant = item.variant
                    }
                }

                //save the user
                req.user.save()
                .then((user) =>
                {
                    return res.json({success:true, data:user, message:`Updated cart for user: ${user.name.first}`})
                })
                .catch((err) => next(err))
            }
            else
            {
                //update the session cart items
                for(let i in req.session.cart.items)
                {
                    if(String(req.session.cart.items[i].product._id) === String(item.product._id))
                    {
                        req.session.cart.items[i].quantity = item.quantity
                        req.session.cart.items[i].variant = item.variant
                        req.session.cart.items[i].total = req.session.cart.items[i].quantity * req.session.cart.items[i].product.unitPrice.amount
                        req.session.cart.items[i].updatedAt = date.toISOString(Date.now())
                    }
                }

                //calculate the new cart total
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
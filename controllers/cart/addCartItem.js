const addCartItem = (req, res, next) =>
{
    //values for the session cart
    let cartTotal = 0
    let item = req.body.item
    let date = new Date()
    if(item)
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

        if(item.product&&item.quantity)
        {
            //Check if user is logged in
            if(req.isAuthenticated())
            {
                //append the item into the user cart items
                //total is calculated automatically 
                req.user.cart.items = [...req.user.cart.items, item]
                req.user.save()
                .then((user) => res.json(res.json({success:true, data:user, message:`Updated cart for user: ${user.name.first}`})))
                .catch((err) => next(err))
            }
            else
            {
                //update session cart
                //this is so that a user can still add items into the session cart without logging in

                //add time stamps to the cart item
                item.createdAt = date.toISOString(Date.now())
                item.updatedAt = date.toISOString(Date.now())

                //update the item's total
                item.total = item.product.unitPrice.amount * item.quantity

                //append the updated item into the session.cart.items array
                req.session.cart.items = [...req.session.cart.items, item]

                //calculate the new cart total
                for(item  in req.session.cart.items)
                {
                    cartTotal += req.session.cart.items[item].total
                }

                //update the new cart total
                req.session.cart.total = cartTotal
                res.json({success:true, data:req.session.cart, message:`Updated cart for session`})
            }
        }
        else
        {
            res.code = 400
            next(new Error("Incorrect input"))
        }
    }
    else
    {
        res.code = 400
        next(new Error("Incorrect input"))
    }
}
module.exports = addCartItem
const deleteCart = (req, res, next) =>
{
    let cartTotal = 0
    let item = req.body.item
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
        if(item.product)
        {

            //check if the user is logged in
            if(req.isAuthenticated())
            {
                //remove the item from the user cart items array
                for(let i in req.user.cart.items)
                {
                    if(String(req.user.cart.items[i].product._id) === String(item.product._id))
                    {
                        req.user.cart.items.splice(i, 1)
                    }
                }

                //save the user
                req.user.save()
                .then((user) =>
                {
                    res.json({success:true, data:user, message:`Updated cart for user: ${user.name.first}`})
                })
                .catch((err) => next(err))
            }
            else
            {
                //remove the item from the session cart items array
                for(let i in req.session.cart.items)
                {
                    if(String(req.session.cart.items[i].product._id) === String(item.product._id))
                    {
                        req.session.cart.items.splice(i, 1)
                    }
                }

                //calculate the new total
                for(item  in req.session.cart.items)
                {
                    cartTotal += req.session.cart.items[item].total
                }

                //update the new total
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
module.exports = deleteCart
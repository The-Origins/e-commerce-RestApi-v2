module.exports = (req, res, next) =>
{
    //update user cart

    //set req.session  to what it was before loggin
    req.session.recent = res.recent

    //id array for products that are already in the user cart
    let ids = []

    //check if the sessions cart contains any products
    if(res.cart.items.length)
    {
        //capture all the ids of the products in the user cart.items
        for(let item in req.user.cart.items)
        {
            ids = [...ids, String(req.user.cart.items[item].product._id)]
        }

        //loop through the session cart items
        for(let item in res.cart.items) 
        {
            //check if the cart already has the product 
            if(!ids.includes(String(res.cart.items[item].product._id)))
            {
                //if not append the product into the users cart items
                //this is so that you don't have duplicate products in the user cart
                req.user.cart.items = [...req.user.cart.items, res.cart.items[item]]
            }
        }
    }

    //update the user
    req.user.save()
    .then(() => {
        res.redirect("/api/user/login-success")
    })
    .catch((err) => next(err))
}
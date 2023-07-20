const Product = require("../../config/database").models.Product

const getProduct = (req, res, next) =>
{
    Product.findOne({_id:req.params.id})
    .then((product) => 
    {
        if(!product)
        {
            return next(new Error(`No product with id:${req.params.id}`))
        }
        res.json({success:true, data:product, message:`Retrived product '${product.name}' from products`})
    })
    .catch((err) => next(err))
}

module.exports = getProduct
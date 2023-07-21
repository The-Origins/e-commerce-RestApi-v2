const Product = require("../../config/database").models.Product

const getProduct = (req, res, next) =>
{
    Product.findOne({_id:req.params.id})
    .then((product) => 
    {
        if(!product)
        {
            res.code = 400
            return next(new Error(`No product with id:${req.params.id}`))
        }
        //updates recent session activity
        req.session.recent = [product, ...req.session.recent]
        
        res.json({success:true, data:product, message:`Retrived product '${product.name}' from products`})
    })
    .catch((err) => next(err))
}

module.exports = getProduct

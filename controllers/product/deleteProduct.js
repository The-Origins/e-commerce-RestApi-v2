const Product = require("../../config/database").models.Product

//deletes product from database
const deleteProduct = (req,res,next) =>
{
    Product.findOneAndDelete({_id:req.params.id}).then((product) =>
    {
        if(!product)
        {
            res.code = 400
            return next(new Error(`No product with id: ${req.params.id}`))
        }
        res.json({success:true, data:product, message:`Deleted product '${product.name}' from products`})
    })
    .catch((err) =>next(err))
}
module.exports = deleteProduct

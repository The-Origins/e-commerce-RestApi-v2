const Product = require("../../config/database").models.Product

const updateProduct = (req,res,next) =>
{
    let edits = Object.keys(req.body).join(", ")
    Product.findOne({_id:req.params.id})
    .then((product) =>
    {
        if(!product)
        { 
            res.code = 400
            return next(new Error(`No product with id:${req.params.id}`))
        }
        for(let property in req.body)
        {
            product[property] = req.body[property]
        }
        product.save()
        res.status(200).json({success:true, data:product, message:`edited '${edits}' in ${product.name}`})
    })
    .catch((err) => next(err))
}
module.exports = updateProduct

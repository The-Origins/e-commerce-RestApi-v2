const Product = require("../../config/database").models.Product

//Adds product to database
const addProduct = (req, res, next) =>
{
    Product.create({...req.body})
    .then((product) => 
    {
        res.status(201).json({success:true, data:product, message:`added product '${product.name}' to products`})
    })
    .catch((err) => next(err))
}

module.exports = addProduct
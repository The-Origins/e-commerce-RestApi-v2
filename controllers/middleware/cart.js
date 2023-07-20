module.exports = (req, res, next) => 
{
    res.cart=req.session.cart
    res.recent = req.session.recent
    next()
}
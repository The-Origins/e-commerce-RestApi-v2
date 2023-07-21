module.exports = (req, res, next) => 
{
    //takes the values from the request and adds them to the response
    //so that on login the data is not reset
    res.cart=req.session.cart
    res.recent = req.session.recent
    next()
}
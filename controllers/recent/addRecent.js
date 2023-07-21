module.exports = (req, res, next) =>
{
    //this is done automatically when you GET /api/product/:id 
    //but if you need to manually do it you can
    req.session.recent = [req.body.product, ...req.session.recent]
    res.json({success:true, data:req.session.recent, message:`Updated recent session activity`})
}
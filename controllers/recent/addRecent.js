module.exports = (req, res, next) =>
{
    req.session.recent = [req.body.product, ...req.session.recent]
    res.json({success:true, data:req.session.recent, message:`Updated recent session activity`})
}
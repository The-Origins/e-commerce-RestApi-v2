const errorHandler = (err, req, res, next) =>
{
    if(err)
    {
        res.json({success:false, data:[], message:err.message})
    }
    next()
}
module.exports = errorHandler
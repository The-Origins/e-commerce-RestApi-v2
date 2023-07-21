const errorHandler = (err, req, res, next) =>
{
    //handles all the errors and faliures 
    //res.code helps keep the status valid
    res.code = res.code ? res.code : 500
    if(err)
    {
        res.status(res.code).json({success:false, data:[], message:err.message})
    }
    next()
}
module.exports = errorHandler

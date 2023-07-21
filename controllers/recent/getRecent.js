module.exports = (req, res, next) =>
{
    //returns recent session activity
    res.json({sucess:true, data:req.session.recent, message:`retrieved recent session activity`})
}
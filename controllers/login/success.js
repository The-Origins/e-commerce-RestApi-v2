module.exports = (req, res, next) => 
{
    //return the logged in user
    res.json({success:true, data:req.user, message:`successfully logged in user: ${req.user.name.first}`})
}
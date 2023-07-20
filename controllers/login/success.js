module.exports = (req, res, next) => 
{
    res.json({success:true, data:req.user, message:`successfully logged in user: ${req.user.name.first}`})
}
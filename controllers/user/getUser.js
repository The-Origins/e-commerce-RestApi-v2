module.exports = (req, res, next) =>
{
    res.json({success:true, data:req.user, message:`returned user ${req.user.name.first}`})
}
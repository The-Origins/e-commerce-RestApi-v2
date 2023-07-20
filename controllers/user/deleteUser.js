const User = require("../../config/database").models.User

module.exports= (req,res,next) =>
{
    User.findOneAndDelete({_id:req.user._id})
    .then((user) =>
    {
        res.json({success:true, data:user, message:`Deleted user '${user.name.first}' from users`})
    })
    .catch((err) => next(err))
}

const User = require("../../config/database").models.User

const deleteUser = (req,res,next) =>
{
    User.findOneAndDelete({_id:req.params.id}).then((user) =>
    {
        if(!user)
        {
            res.code = 400
            return next(new Error(`No user with id: ${req.params.id}`))
        }
        res.json({success:true, data:user, message:`Deleted user '${user.name.first}' from users`})
    })
    .catch((err) => next(err))
}
module.exports = deleteUser

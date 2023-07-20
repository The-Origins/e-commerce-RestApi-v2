const User = require("../../config/database").models.User

const updateUser = (req,res,next) =>
{
    let edits = Object.keys(req.body).join(", ")
    User.findOne({_id:req.params.id})
    .then((user) =>
    {
        if(!user)
        { 
            return next(new Error(`No user with id:${req.params.id}`))
        }
        for(let property in req.body)
        {
            user[property] = req.body[property]
        }
        user.save()
        res.status(200).json({success:true, data:user, message:`edited '${edits}' in user ${user.name.first}`})
    })
    .catch((err) => next(err))
}
module.exports = updateUser
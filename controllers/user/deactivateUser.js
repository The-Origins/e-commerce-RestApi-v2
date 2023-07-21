module.exports= (req,res,next) =>
{
    //deactivate a user account
    req.user.active = false
    req.user.save()
    .then((user) =>
    {
        res.json({success:true, data:user, message:`Deactivated user '${user.name.first}' from users`})
    })
    .catch((err) => next(err))
}

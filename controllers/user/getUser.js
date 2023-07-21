module.exports = (req, res, next) =>
{
    //return req.user after updating them
    req.user.save().then((user) =>
    {
        res.json({success:true, data:req.user, message:`returned user ${req.user.name.first}`})
    })
    .catch((err) => next(err))
}
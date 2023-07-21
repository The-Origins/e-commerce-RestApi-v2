module.exports = (req,res,next) =>
{
    //Update user

    //track edited fields
    let edits = Object.keys(req.body).join(", ")

    for(let property in req.body)
    {
        req.user[property] = req.body[property]
    }

    //update user
    req.user.save()
    .then(() => 
    {
        res.status(200).json({success:true, data:req.user, message:`edited '${edits}' in user ${req.user.name.first}`})
    })
    .catch((err) => next(err))
}

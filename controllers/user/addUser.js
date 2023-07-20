const User = require("../../config/database").models.User
const utils = require("../../lib/utils")


const addUser = (req, res, next) =>
{
    if(!req.body.email&&req.body.password)
    {
        res.code = 400
        return next(new Error("Email and password required"))
    }
    const user = req.body
    const generated = utils.generatePasswordHash(req.body.password) 
    delete user.password
    User.create({...user, ...generated})
    .then((user) => 
    {
        res.status(201).json({success:true, data:user, message:`added user '${user.name.first}' to users`})
    })
    .catch((err) => next(err))
}

module.exports = addUser

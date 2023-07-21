const User = require("../../config/database").models.User
const utils = require("../../lib/utils")


const addUser = (req, res, next) =>
{
    //registers a user into the database

    //body must contain email and password
    if(!req.body.email&&req.body.password)
    {
        res.code = 400
        return next(new Error("Email and password required"))
    }
    const user = req.body

    //generate a password hash with the password that was passed in
    const generated = utils.generatePasswordHash(req.body.password) 

    //delete user password from the req.body so that it isn't added to the database
    //this is unecessary as the userSchema doesn't have a password property and would be ignored
    delete user.password

    //create a user with the credentials passed in the body and the generated hash and salt for the password
    User.create({...user, ...generated})
    .then((user) => 
    {
        res.status(201).json({success:true, data:user, message:`added user '${user.name.first}' to users`})
    })
    .catch((err) => next(err))
}

module.exports = addUser

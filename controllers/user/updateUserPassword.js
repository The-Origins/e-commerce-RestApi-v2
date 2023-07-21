const utils = require("../../lib/utils")

module.exports = (req, res, next) =>
{
    //update the user's password

    if(req.body.password)
    {
        // req.body syntax:
        // {
        //     "password":"my password"
        // }

        //generate a new hash and salt for the user
        const generated = utils.generatePasswordHash(req.body.password)

        //change the user hash and salt
        req.user.hash = generated.hash
        req.user.salt = generated.salt

        //update the user
        req.user.save()
        .then((user) => {
            res.json({success:true, data:user, message:`Successfully updated ${user.name.first}'s password`})
        })
        .catch((err) => next(err))
    }
}
const utils = require("../../lib/utils")

module.exports = (req, res, next) =>
{
    if(req.body.password)
    {
        const generated = utils.generatePasswordHash(req.body.password)
        req.user.hash = generated.hash
        req.user.salt = generated.salt
        req.user.save()
        .then((user) => {
            res.json({success:true, data:req.user, message:`Successfully updated ${req.user.name.first}'s password`})
        })
        .catch((err) => next(err))
    }
}
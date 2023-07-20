const passport = require("passport")
const PassportLocal = require("passport-local").Strategy
const utils = require("../lib/utils")
const User = require("./database").models.User

const strategy = new PassportLocal({usernameField:"email"},(username, password, done) =>
{
    User.findOne({email:username})
    .then((user) => 
    {
        if(!user)
        {
            return done(null, false)
        }

        const isValid = utils.validatePasswordHash(password, user.hash, user.salt)
        if(isValid)
        {
            return done(null, user)
        }
        else
        {
            return done(null, false)
        }
    })
    .catch((err) => done(err))
})

passport.use(strategy)

passport.serializeUser((user, done) =>
{
    done(null, user._id)
})

passport.deserializeUser((id, done) =>
{
    User.findById(id)
    .then((user) =>
    {
        done(null,user)
    })
    .catch((err) => done(err))
})
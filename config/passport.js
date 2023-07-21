//import all the necessary modules
const passport = require("passport")
const PassportLocal = require("passport-local").Strategy
const utils = require("../lib/utils")
const User = require("./database").models.User

//define the strategy
//this is run every single time you login or check if the request is authenticated
const strategy = new PassportLocal({usernameField:"email"},(username, password, done) =>
{
    //find the user through their email
    //passport local strictly only takes in username, and password
    //to define a different kind of field other than username you must pass it in the options object
    User.findOne({email:username})
    .then((user) => 
    {
        if(!user)
        {
            return done(null, false)
        }
        //validate the password entered by generating a new hash and checking wether that hash is equal to the hash saved in the database
        const isValid = utils.validatePasswordHash(password, user.hash, user.salt)

        //return user if the password is valid
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

//set passport to use the defined strategy
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
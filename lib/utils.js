const crypto = require("crypto")

//generate a password hash and salt for the password passed in the args using crypto
const generatePasswordHash = (password) =>
{
    const salt = crypto.randomBytes(32).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")

    //return object containing the generated hash and salt
    return {
        salt:salt,
        hash:hash
    }
}

//verify password using the hash and salt passed in the args
const validatePasswordHash = (password, hash, salt) =>
{
    const newhash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")

    //check if the newhash is the same as the existing hash
    return newhash === hash
}

module.exports.generatePasswordHash = generatePasswordHash
module.exports.validatePasswordHash = validatePasswordHash
const crypto = require("crypto")

const generatePasswordHash = (password) =>
{
    const salt = crypto.randomBytes(32).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return {
        salt:salt,
        hash:hash
    }
}

const validatePasswordHash = (password, hash, salt) =>
{
    const newhash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return newhash === hash
}

module.exports.generatePasswordHash = generatePasswordHash
module.exports.validatePasswordHash = validatePasswordHash
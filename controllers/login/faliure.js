module.exports = (req, res, next) => 
{
    res.code = 400
    next(new Error("Invalid email or password"))
}

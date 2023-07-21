module.exports = (req, res, next) => 
{
    //send and error message and a status code
    res.code = 400
    next(new Error("Invalid email or password"))
}

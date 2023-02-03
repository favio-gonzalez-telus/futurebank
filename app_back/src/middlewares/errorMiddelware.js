module.exports = (error,req,res,next) => {
    if(!error){
        return next();
    }
    return res.status(400).json({
        status:'error',
        path: req.path,
        method: req.method,
        message: error.message
    })
}
const Guard = require('./../models/guard');

module.exports = async (req,res,next)=>{
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        return res.status(403).json({
            message: 'unauthorized'
        })
    }
    const person_token = req.headers.authorization.split('Bearer ')[1];
    const args ={
        person_token
    }
    try {
        const { rows } = await Guard.checkToken(args);
        //console.log(rows);
        if(rows.length > 0 ){
            req.person = rows[0];
            return next();
        }
    } catch (error) {
        console.log(error);
    }
    res.status(403).json({
        message: 'unauthorized'
    })
}
const jwt = require('jsonwebtoken');
const { secret } = require('../config/app.config');

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS'){
        next();
    }

    try {
        const token = req.headers.authorization;
        console.log(token)

        if(!token){
            return res.status(401).json({message:'Пользователь не авторизован'});
        }
        const decodeData = jwt.verify(token, secret)
        req.user = decodeData.user;
        next();
    }
    catch(e){
        console.log(e);
        return res.status(403).json({status:403,message:'Токен протух'});
    }
};
const db = require('../DBConnection');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/app.config')

const generateAccessToken = (id, role) => {
    const payload = {
        id, 
        role
    };
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class AuthController {
    async addUser(req,res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Reg Error', errors})
            }
            const {LOGIN, PASSWORD, ROLE_ID }  = req.body;
            const check = await db.select('*').from('USERS').where('LOGIN', LOGIN)[0];
            if(!!check){
                return res.status(400).json({message:'Login is using'})
            }
            const hashesPassword = bcrypt.hashSync(PASSWORD);
            const result = await db('USERS').insert({LOGIN, PASSWORD: hashesPassword, ROLE_ID});
            res.json(result);
        }
        catch(e){
            console.log(e);
            res.status(400).json({message:'RegError'})
        }
    }

    async GetToken(req, res, next) {
        try{
            const {LOGIN, PASSWORD} = req.body;
            const user = await db.select('*').from('USERS').where('LOGIN', LOGIN).first();
            if(!user){
                return res.status(400).json({message:'Пользователь не найден'});
            }
            const validPassword = bcrypt.compareSync(PASSWORD, user.PASSWORD.trim());
            if(!validPassword){
                return res.status(400).json({message:'Неверный пароль'});
            }

            const token = generateAccessToken(user.ID, user.ROLE_ID);
            console.log(token)
            return res.json({token});
        }
        catch(e){
            console.log(e);
            return res.status(400).json({message:'LoginError'})
        }
    }
}

module.exports = new AuthController();
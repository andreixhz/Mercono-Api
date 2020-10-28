const express = require('express');
const router = express.Router();
const authConfig = require('../../config/auth');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

const User = require('../models/User');

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {expiresIn: 986400,});

router.post('/authenticate', async (req, res) => {

    const {email, password} = req.body;

    if(!email) return res.status(400).send({status:400, code:'auth_without_email'});
    if(!password) return res.status(400).send({status:400, code:'auth_without_password'});

    const user = await User.findOne({where:{email, password}});

    if(user){
        user.password = undefined;
        return res.status(200).send({status:200, code:'auth_sucess',token:generateToken({id: user.id}), data:user});
    } else {
        return res.status(400).send({status:400, code:'auth_invalid_credentials'});
    }

});

router.post('/create', async(req, res) => {

    try{
        let data = req.body;
        if(await User.findOne({where:{email: data.email}})) return res.status(409).send({status:409, code:'user_already_exists'});

        data.uniqcode = uniqid('user-');

        User.create(data).then(user => {
            user.password = undefined;
            return res.status(201).send({status:201,code:'auth_registration_sucess',token:generateToken({id: user.id}),data:user.toJSON()});
        });

    } catch (err){
        return res.status(400).send({log: 'auth_registration_failed'});
    }

});

module.exports = app => app.use('/auth', router);
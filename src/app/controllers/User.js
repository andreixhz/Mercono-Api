const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/:id', async(req,res) => {
    const { id } = req.params;
    const user = await User.findAll({where:{id}});
    return res.status(200).send({status:200,code:'user_getted',data:user});
});

module.exports = app => app.use('/user', router);
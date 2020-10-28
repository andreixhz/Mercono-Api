const express = require('express');
const router = express.Router();
const City = require('../models/City');

router.get('/', async(req,res) => {

    const { page = 1 } = req.query;
    const count = await City.count();

    if(count === undefined || count === 0) return res.status(200).send({status:200,code:'products_noData'});

    const cities = await City.findAll({
        offset: (page - 1) * 20,
        limit: 20
    })

    res.header('X-Total-Count', count);
    console.log(count)
    return res.status(200).send({status:200,code:'products_getted', data:cities});
    
});

module.exports = app => app.use('/city', router);
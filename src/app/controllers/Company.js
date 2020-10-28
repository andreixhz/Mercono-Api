const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const authMiddleware = require('../middlewares/auth');
const uniqid = require('uniqid');

router.use(authMiddleware);

router.get('/:id', async(req,res) => {
    const { id } = req.params;
    const company = await Company.findOne({where:{id}});
    return res.status(200).send({status:200,code:'company_getted_by_id',data:company});
});

router.post('/', async(req,res) => {
    let data = req.body;
    console.log(req);
    console.log('user id: ' + req.userId);
    data.userId = req.userId;

    if(await Company.findOne({where:{cnpj:data.cnpj}})) return res.status(409).send({status:409, code:'company_cnpj_already_exists'});
    
    data.uniqcode = uniqid('establishment-');

    Company.create(data).then(company => {
        return res.status(200).send({status:200,code:'company_creted',data:company});
    });
});

router.get('/', async(req,res) => {

    const { page = 1 } = req.query;
    const count = await Company.count();

    if(count === undefined || count === 0) return res.status(200).send({status:200,code:'products_noData'});

    const companys = await Company.findAll({
        offset: (page - 1) * 5,
        limit: 5
    })

    res.header('X-Total-Count', count['count(*)']);
    console.log(count)
    return res.status(200).send({status:200,code:'company_getted_all',data:companys});

});

module.exports = app => app.use('/company', router);
const express = require('express');
const router = express.Router();
const Establishment = require('../models/Establishment');
const Company = require('../models/Company');
const uniqid = require('uniqid');

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/:code', async(req,res) => {
    const { code } = req.params;
    const establishment = await Establishment.findOne({where:{code}});
    return res.status(200).send({status:200,code:'establishment_getted',data:establishment});
});

router.post('/', async(req, res) => {
    
    let data = req.body;

    if(await !Company.findOne({where:{id:data.CompanyId}})) return res.status(400).send({status:400, code:'establishment_no_company_selected'});
    if(await Establishment.findOne({where:{cnpj:data.cnpj}})) return res.status(409).send({status:409, code:'establishment_cnpj_already_exists'});
    
    data.code = uniqid.time();
    data.uniqcode = uniqid('establishment-');

    Establishment.create(data).then(establishment => {
        return res.status(200).send({status:200,code:'establishment_creted',data:establishment});
    });
});

module.exports = app => app.use('/establishment', router);
const express = require('express');
const router = express.Router();
const EstablishmentProduct = require('../models/EstablishmentProduct');
const Product = require('../models/Product');
const Establishment = require('../models/Establishment');
const uniqid = require('uniqid');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

const createEstablishProduct = async (EstablishmentId,price, codeBar, code , res) => {

    const uniqcode = uniqid('establishmentProduct-');
    EstablishmentProduct.create({price, codeBar, EstablishmentId:EstablishmentId.id,uniqcode}).then(establishmentProduct=>{
        return res.status(200).send({status:200,code,data:establishmentProduct});
    })
}
//product_and_establishmentProduct_creted
router.post('/:code/products', async(req,res) => {

    const {name, codeBar, price} = req.body;
    const { code } = req.params;
    const product = await Product.findOne({where:{codeBar}});
    const EstablishmentId = await Establishment.findOne({where:{code}});

    if(!product){
        const uniqcode = uniqid('product-');
        await Product.create({name, codeBar, uniqcode}).then(async product => {
            createEstablishProduct(EstablishmentId,price, codeBar, 'product_and_establishmentProduct_creted', res)
        });
    } else {
        if(await EstablishmentProduct.findOne({where:{codeBar, EstablishmentId:EstablishmentId.id}})) return res.status(409).send({status:409, code:'establishmentProduct_already_exists'});
        
        createEstablishProduct(EstablishmentId,price, codeBar, 'establishmentProduct_creted', res)
    }

});

router.get('/:code/products', async(req,res) => {

    const { page = 1 } = req.query;
    const { code } = req.param;

    const count = await EstablishmentProduct.count({where:{code}});

    if(count === undefined || count === 0) return res.status(200).send({status:200,code:'products_noData'});

    const products = await EstablishmentProduct.findAll({
        offset: (page - 1) * 5,
        limit: 5,
        where:{
            code
        }
    })

    res.header('X-Total-Count', count['count(*)']);
    console.log(count)
    return res.status(200).send({status:200,code:'establishment_products_getted', data:products});
    
});

router.get('/:code/products/:codeBar', async(req,res) => {

    const { codeBar, code } = req.params;
    const establishmenteId = await Establishment.findOne({where:{code}});
    const establishmentProduct = await EstablishmentProduct.findOne({where:{EstablishmentId: establishmenteId.id, codeBar}});
    const product = await Product.findOne({where:{codeBar}});
    return res.status(200).send({status:200,code:'establishment_product_getted_by_codebar',data:{product, establishmentProduct}});

});

module.exports = app => app.use('/establishments', router);
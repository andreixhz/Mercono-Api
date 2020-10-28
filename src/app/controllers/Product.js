const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async(req,res) => {

    const { page = 1 } = req.query;
    const count = await Product.count();

    if(count === undefined || count === 0) return res.status(200).send({status:200,code:'products_noData'});

    const products = await Product.findAll({
        offset: (page - 1) * 5,
        limit: 5
    })

    res.header('X-Total-Count', count);
    console.log(count)
    return res.status(200).send({status:200,code:'products_getted', data:products});
    
});

router.get('/:codeBar', async(req,res) => {
    const { codeBar } = req.params;
    const product = await Product.findAll({where:{codeBar}});
    return res.status(200).send({status:200,code:'product_getted_by_codebar',data:product});
});

router.get('/category/:cat_id', async(req, res) => {
    const { cat_id } = req.params;
    const { page = 1 } = req.query;
    const products = await Product.findAll({
        where:{categoryId:cat_id},
        offset: (page - 1) * 5,
        limit: 5 
    });
    return res.status(200).send({status:200,code:'products_getted_by_category',data:products});
});

module.exports = app => app.use('/product', router);
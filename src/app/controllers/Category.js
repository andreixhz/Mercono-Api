const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const uniqid = require('uniqid');

const authMiddleware = require('../middlewares/auth');
router.use(authMiddleware);

router.get('/', async(req,res) => {

    const { page = 1 } = req.query;
    const count = await Category.count();
    console.log(count + " - coooooooooooooooooooount")
    if(count === undefined || count === 0) return res.status(200).send({status:200,code:'products_noData'});

    const category = await Category.findAll({
        offset: (page - 1) * 20,
        limit: 20
    });

    res.header('X-Total-Count', count);
    return res.status(200).send({status:200,code:'category_geted', data:category});

});

router.post('/', async(req, res) => {
    
    let data = req.body;

    if(await !Category.findOne({where:{id:data.name}})) return res.status(409).send({status:409, code:'category_already_exists'});
    
    data.code = uniqid.time();
    data.uniqcode = uniqid('category-');

    Category.create(data).then(category => {
        return res.status(200).send({status:200,code:'category_creted',data:category});
    });
});

module.exports = app => app.use('/category', router);
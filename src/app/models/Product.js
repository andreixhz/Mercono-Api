const conn = require('../../database');
const {Sequelize} = require('sequelize');
const Category = require('./Category');
const Product = conn.define('product', 
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uniqcode:{
        type: Sequelize.STRING(500),
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codeBar:{
        type: Sequelize.STRING,
        allowNull: false
    },
    updatedAt:{
        type: Sequelize.DATE,
        allowNull: true
    },
    createdAt:{
        type: Sequelize.DATE,
        allowNull: true
    }
});

Category.hasOne(Product);
Product.belongsTo(Category);

module.exports = Product;
const conn = require('../../database');
const {Sequelize} = require('sequelize');
const Category = conn.define('category', 
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
    updatedAt:{
        type: Sequelize.DATE,
        allowNull: true
    },
    createdAt:{
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Category;
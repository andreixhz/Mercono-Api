const conn = require('../../database');
const {Sequelize} = require('sequelize');
const City = conn.define('city', 
{
    id:{
        type:Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(120),
        allowNull: false
    },
    state:{
        type: Sequelize.INTEGER(5),
        allowNull: true
    }
});
module.exports = City;

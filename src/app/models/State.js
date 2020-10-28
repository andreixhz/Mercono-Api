const conn = require('../../database');
const {Sequelize} = require('sequelize');
const State = conn.define('state', 
{
    id:{
        type:Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(75),
        allowNull: false
    },
    uf:{
        type: Sequelize.STRING(5),
        allowNull: false
    }
});
module.exports = State;

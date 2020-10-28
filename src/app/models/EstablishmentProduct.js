const conn = require('../../database');
const {Sequelize} = require('sequelize');
const Establishment = require('./Establishment');
const EstablishmentProduct = conn.define('establishmentProduct', 
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    codeBar:{
        type: Sequelize.STRING,
        allowNull: false
    },
    uniqcode:{
        type: Sequelize.STRING(500),
        allowNull: false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull: true
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

Establishment.hasOne(EstablishmentProduct);
EstablishmentProduct.belongsTo(Establishment);

module.exports = EstablishmentProduct;
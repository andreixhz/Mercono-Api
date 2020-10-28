const conn = require('../../database');
const {Sequelize} = require('sequelize');
const Company = require('./Company');


const Establishment = conn.define('Establishment', {
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
  establishmentName: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  code:{
    type: Sequelize.STRING(25),
    allowNull: true
  },
  cnpj: {
    type: Sequelize.STRING(14),
    allowNull: false
  },
  city:{
    type: Sequelize.STRING(25),
    allowNull: true
  },
  Uf:{
    type: Sequelize.STRING(2),
    allowNull: true
  },
  neighborhood:{
    type: Sequelize.STRING(25),
    allowNull: true
  },
  address:{
    type: Sequelize.STRING(50),
    allowNull: true
  },
  postalCode:{
    type: Sequelize.STRING(50),
    allowNull: true
  },
  coords: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  updatedAt:{
    type: Sequelize.DATE,
    allowNull: false
  },
  createdAt:{
    type: Sequelize.DATE,
    allowNull: false
  }
});

Company.hasOne(Establishment);
Establishment.belongsTo(Company);

module.exports = Establishment;

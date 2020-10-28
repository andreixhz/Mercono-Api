const conn = require('../../database');
const {Sequelize} = require('sequelize');
const User = require('./User')

const Company = conn.define('Company', {
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
  companyName: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  cnpj: {
    type: Sequelize.STRING(14),
    allowNull: false
  },
  locale: {
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


User.hasOne(Company);
Company.belongsTo(User);

module.exports = Company;

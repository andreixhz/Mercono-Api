const conn = require('../../database');
const {Sequelize} = require('sequelize');
const User = conn.define('user', {
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
  firstName: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  email: {
      type: Sequelize.STRING(60),
      allowNull: false
  },
  password: {
      type: Sequelize.STRING(60),
      allowNull: false
  },
  peopleNumber:{
    type:Sequelize.INTEGER,
    allowNull: true
  },
  spentMonth:{
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
module.exports = User;

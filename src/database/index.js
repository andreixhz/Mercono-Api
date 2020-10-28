const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('teste', 'root', '', {
  host: 'localhost',
  dialect: "mysql", /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  port:3308
}); 

module.exports = sequelize;
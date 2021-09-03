const Sequelize = require('sequelize');

const { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } = process.env;

const database = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost',
  port: DATABASE_PORT,
});

// check the databse connection
database
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = database;
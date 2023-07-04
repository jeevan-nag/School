const { Sequelize } = require('sequelize');
require('dotenv').config()

const dbConfig = {
    database: process.env.DB_name,
    userName: process.env.DB_userName,
    password: process.env.DB_password,
    host: process.env.DB_host
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.userName, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
});

const dbConnect = async function () {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const disconnectDB = async function () {
    try {
        await sequelize.close();
        console.log('Database connection disconnected successfully.');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
    }
}
module.exports = {sequelize}

  
  
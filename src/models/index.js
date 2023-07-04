const { sequelize } = require("../../database/dbconnection");
const {student} = require("./student");
const {parent} = require("./parent");
const {address} = require("./address")
sequelize.sync(); 
module.exports = {student, parent, address, sequelize}
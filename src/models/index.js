const { sequelize } = require("../../database/dbconnection");
const {student} = require("./student");
const {parent} = require("./parent");
const {address} = require("./address");
const {optionalSubject} = require("./optionalSubject");
const {extraCurricularActivity} = require("./extraCurricularActivity");
const {studentActivity} = require("./studentActivity")
sequelize.sync(); // to synchronize all models successfully

// sequelize.sync({alter: true}) // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

// sequelize.sync({force: true}) // This creates the table, dropping it first if it already existedle
// sequelize.drop(); // To drop all the tables in DB
module.exports = {student, parent, address, optionalSubject, extraCurricularActivity, studentActivity, sequelize}
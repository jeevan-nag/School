
const {DataTypes} = require('sequelize')
const {sequelize} = require("../../database/dbconnection")
const {parent} = require("./parent");
const {address} = require("./address");

const student = sequelize.define("students", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.STRING,
        allowNull: false
    }
 });

student.hasOne(parent, { foreignKey: 'studentId' });
student.hasOne(address, { foreignKey: 'studentId' });
parent.belongsTo(student, { foreignKey: 'studentId' });
address.belongsTo(student, {foreignKey: 'studentId'});

module.exports = {student};

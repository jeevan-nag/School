
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
        allowNull: false,
        validate:{
            isAlpha:true
        }
    },
    DOB: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isDate:true
        }
    },
    optionalSubjectId: {
        type: DataTypes.UUID,
        allowNull: false
    }
 });

//One-One Association
// onDelete: 'cascade' and hooks: true the associate table data also will be deleted 
student.hasOne(parent, { foreignKey: 'studentId', onDelete:'cascade', hooks:true});
student.hasOne(address, { foreignKey: 'studentId',  onDelete:'cascade', hooks:true });
parent.belongsTo(student, { foreignKey: 'studentId',  onDelete:'cascade', hooks:true });
address.belongsTo(student, {foreignKey: 'studentId',  onDelete:'cascade', hooks:true});

module.exports = {student};

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/dbconnection');
const { student } = require('./student');

const parent = sequelize.define('parents', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fatherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emergencyContact: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
});

module.exports = { parent };

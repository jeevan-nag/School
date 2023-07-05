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
    allowNull: false,
    validate:{
      isAlpha: true
    }
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isAlpha: true
    }
  },
  emergencyContact: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    unique: true,
    validate:{
      isNumeric:true,
      max: 10,
      min: 10
    },
  }
},{
  timestamps: false
});

module.exports = { parent };

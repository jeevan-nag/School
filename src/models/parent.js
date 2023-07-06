const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/dbconnection');

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
      isAlpha:{
        args: true,
        msg: "Father Name should contain only letters"
      }
    }
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isAlpha:{
        args:true,
        msg: "Mother Name should contain only letters"
      },
    }
  },
  emergencyContact: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    unique: true,
    validate:{
      isNumeric:true,
      min:{
        args: [10],
        msg: "Invalid Emergency contact number"
      }
    },
  }
},{
  timestamps: false
});

module.exports = { parent };

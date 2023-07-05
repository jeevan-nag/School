const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/dbconnection');

const extraCurricularActivity = sequelize.define('extraCurricularActivity', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate:{
      isAlpha: true
    }
  },
});

module.exports = {extraCurricularActivity};

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/dbconnection');
const {student} = require('./student');

const optionalSubject = sequelize.define('optionalSubject', {
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
},{
  timestamps: false
});

// ONE TO MANY ASSOCIATION 

optionalSubject.hasMany(student, { foreignKey: 'optionalSubjectId' });
student.belongsTo(optionalSubject, { foreignKey: 'optionalSubjectId' });

module.exports = {optionalSubject};

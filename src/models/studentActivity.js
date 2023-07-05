const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/dbconnection');
const {student } = require("./student");
const {extraCurricularActivity} = require("./extraCurricularActivity")

const studentActivity = sequelize.define('studentActivity', {
  studentId: {
    type: DataTypes.UUID,
    references:{
      model:student,
      key:"id"
    }
  },
  extraCurricularActivityId: {
    type: DataTypes.UUID,
    references:{
      model: extraCurricularActivity,
      key: "id"
    }
  }
},{timestamps:false});

//SUPER MANY TO MANY ASSOCIATION 

student.belongsToMany(extraCurricularActivity, { through: studentActivity });
extraCurricularActivity.belongsToMany(student, { through: studentActivity });
student.hasMany(studentActivity);
studentActivity.belongsTo(student);
extraCurricularActivity.hasMany(studentActivity);
studentActivity.belongsTo(extraCurricularActivity);

module.exports = {studentActivity};

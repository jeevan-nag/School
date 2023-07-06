const express = require('express');
const router = express.Router();
const {Op} = require('sequelize')
const {student, parent, address, optionalSubject, extraCurricularActivity, studentActivity} = require("../models");
const {sequelize} = require("../../database/dbconnection")
router.use(express.json());

router.post("/addActivity", async(req, res) => {
    try {
        const { activities } = req.body;
        const extraCurricularActivityData = await extraCurricularActivity.bulkCreate(activities.map(value => ({name:value})), {validator:true})
        return res.status(200).send({success: true, data:extraCurricularActivityData})
    } catch (error) {
        return res.status(400).send({success: false, error})
    }  
})

router.post("/addStudentActivity", async(req, res) => {
    try {
        const {studentId, activity} = req.body;
        const activityData = await extraCurricularActivity.findAll({where:{name:{[Op.or]:activity}}});
        if(activityData.length !== activity.length){
          return res.status(400).send({success:false, message:"activity not found, Please include activity using POST '/addActivity' if required "});
        }
        const payload = studentId.map((studentData) => activityData.map((value) => ({
                                  extraCurricularActivityId: value.id,
                                  studentId: studentData,
                            }))
                        )
              console.log()
        const studentActivityData = await studentActivity.bulkCreate( [].concat(...payload)                                             , {validator:true})
        return res.status(200).send({success: true, data:studentActivityData})
    } catch (error) {
        return res.status(400).send({success: false, error})
    }
})

router.get("/getActivities", async(req, res)=>{
  try {
    return res.status(200).send((await extraCurricularActivity.findAll({attributes:['name']})).map(item => item.name))
  } catch (error) {
    return res.status(400).send({error})
  }
})

//reduce method required here
router.get("/getStudentActivity", async (req, res) => {
    try {
      let whereClause = {};
  
      if (req.query.activity) {
        const activity = await extraCurricularActivity.findOne({
          where: { name: req.query.activity },
          attributes: ['id']
        });
  
        if (!activity)
          return res.status(400).send({ success: false, message: "Not found" });
  
        whereClause.extraCurricularActivityId = activity.id;
      }
  
      if (req.query.studentId)
        whereClause.studentId = req.query.studentId;
  
      const activityData = await studentActivity.findAll({
        where: whereClause,
        attributes:[],
        include:[
          {model: extraCurricularActivity, attributes:['name'] },
          {model: student, attributes:['studentName']}          
        ]
      });
      const transformedData = activityData.reduce((result, item) => {
        const { studentName } = item.student;
        const {name} =item.extraCurricularActivity;
        
        // Find an existing entry for the current student'
        if(whereClause.extraCurricularActivityId){
          const existingEntry = result.find(entry => entry.extraCurricularActivity.name)
            
          if (existingEntry) {
            // If the entry exists, add the activity name to the existing student entry
            existingEntry.students.push(studentName);
          } else {
            // If the entry doesn't exist, create a new entry for the student
            result.push({
              extraCurricularActivity: {
                name: name
              },
              students: [studentName]
            });
          }

        } else{
            const existingEntry = result.find(entry => entry.student.studentName === studentName);
            
            if (existingEntry) {
              // If the entry exists, add the activity name to the existing student entry
              existingEntry.extraCurricularActivities.push(name);
            } else {
              // If the entry doesn't exist, create a new entry for the student
              result.push({
                student: {
                  studentName: studentName
                },
                extraCurricularActivities: [name]
              });
            }
        }
        
        return result;
      }, []);
      return res.status(200).send({ success:true, data: transformedData });
    } catch (error) {
      console.log({error})
      return res.status(400).send({ success: false, error });
    }
  });

module.exports = {router}
const express = require('express');
const router = express.Router();
const {Op} = require('sequelize')
const {student, parent, address, optionalSubject, extraCurricularActivity, studentActivity} = require("../models");
const {sequelize} = require("../../database/dbconnection")
router.use(express.json());

router.post("/addActivity", async(req, res) => {
    const activity = [{name:"chess"}, {name:"cricket"}, {name:"badminton"}, {name:"football"}]
    try {
        const extraCurricularActivityData = await extraCurricularActivity.bulkCreate(activity, {validator:true})
        return res.status(200).send({message:"Success", data:extraCurricularActivityData})
    } catch (error) {
        return res.status(400).send({Success: false, error})
    }  
})

router.post("/addStudentActivity", async(req, res) => {
    try {
        const {studentId, activity} = req.body;
        const activityData = await extraCurricularActivity.findAll({where:{name:{[Op.or]:activity}}});
        const studentActivityData = await studentActivity.bulkCreate( activityData.map((value) => ({extraCurricularActivityId :value.id, studentId }) ), {validator:true})
        return res.status(200).send({message:"Success", data:studentActivityData})
    } catch (error) {
        return res.status(400).send({Success: false, error})
    }
})

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
          {model: student, attributes:['studentName']},
          {model: extraCurricularActivity, attributes:['name'] }
        ]
      });
  
      return res.status(200).send({ message: "Success", data: activityData });
    } catch (error) {
      console.log({error})
      return res.status(400).send({ success: false, error });
    }
  });

module.exports = {router}
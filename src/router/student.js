const express = require('express');
const router = express.Router();
const {student, parent, address, optionalSubject} = require("../models");
const {sequelize} = require("../../database/dbconnection")
router.use(express.json());

router.post("/addStudent", async(req, res)=>{
    const t = await sequelize.transaction();
    try {
        const subject = await optionalSubject.findOne({where:{name: req.body.optionalSubject}});
        const addStudent = await student.create({ optionalSubjectId: subject.id , ...req.body}, { transaction: t });
        await parent.create({ studentId : addStudent.id, ...req.body.parentDetails }, { transaction: t });
        await address.create({ studentId :addStudent.id, ...req.body.address}, { transaction: t });
        await t.commit();
        return res.status(200).send({message:'Success', data: {id:addStudent.id, ...req.body} });
    } catch (error) {
        await t.rollback();
        return res.status(400).send({success:'false', error});
    }
})

router.patch("/updateStudent", async(req, res) => {
    const t = await sequelize.transaction();
    try {
        if(!req.body.id || !await student.findByPk(req.body.id)){
            return res.status(200).send({message:"Invalid Data"});
        }
        await student.update(req.body, {where:{id:req.body.id}} , { transaction: t });
        await parent.update({...req.body.parentDetails}, {where: {studentId: req.body.id}} , { transaction: t });
        await address.update({...req.body.address}, {where: {studentId: req.body.id}} , { transaction: t });
        await t.commit();
        return res.status(200).send({message:'Success', data: await student.findOne({ where: { id: req.body.id },include:[{model:parent}, {model:address}] }) })
    } catch (error) {
        await t.rollback();
        return res.status(400).send({message:"Erorr", error });
    }
})

router.get("/getStudents", async(req, res) =>{
    try {
        let optionalSubjectId;
        if(req.query.subject){
            optionalSubjectId = await optionalSubject.findOne({where:{name:req.query.subject},attributes:['id']})
            if(!optionalSubjectId)
                return res.status(400).send({success:false, message: "Not found"})
            optionalSubjectId = {optionalSubjectId : optionalSubjectId.id}
        }
        const whereClause = optionalSubjectId ?  optionalSubjectId  : {}; 
        const getStudents = await student.findAll({where:whereClause , include:[{model:parent},{model:address},{model: optionalSubject}]});
        return res.status(200).send({message:'Success', data:getStudents});
    } catch (error) {
        return res.status(400).send({message:"Erorr", error });
    }
})

router.get("/getStudent/:id" , async(req, res) =>{
    try {
        if(!req.params.id || !await student.findByPk(req.body.id)){
            return res.status(200).send({message:"missing id"});
        }
        const getStudentId = await student.findOne({where:{id: req.params.id}, include:[{model:parent},{model:address}] });
        return res.status(200).send({message:'Success', data:getStudentId});
    } catch (error) {
        return res.status(400).send({message:"Erorr", error });
    }
})

router.delete("/deleteStudent/:id", async(req, res) => {
    try {
        if(!req.params.id || !await student.findByPk(req.params.id)){
            return res.status(200).send({message:"missing id"});
        }
        await student.destroy({where:{id: req.params.id}, include:[{model:parent},{model:address}]});
        return res.status(200).send({message:'Success', data:"Deleted successfully "});
    } catch (error) {
        return res.status(400).send({message:"Erorr", error });
    }
})

module.exports = {router};

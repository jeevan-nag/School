const express = require('express');
const router = express.Router();
const {student, parent, address, optionalSubject} = require("../models");
const {sequelize} = require("../../database/dbconnection")
router.use(express.json());

router.post("/addStudent", async(req, res)=>{
    const t = await sequelize.transaction();
    try {
        const optionalSubjectId = (await optionalSubject.findOne({ where:{name:req.body.optionalSubject},attributes:['id']} )).id;
        if(!optionalSubjectId){
            return res.status(400).send({success: false, message:"Optional_Subject not found. Please include a optional subject using POST '/addOptionalSubject' if required "})
        }
        req.body.optionalSubjectId = optionalSubjectId
        const addedStudent = await student.create(req.body, { transaction: t });
        await parent.create({ studentId : addedStudent.id, ...req.body.parentDetails }, { transaction: t });
        await address.create({ studentId :addedStudent.id, ...req.body.address}, { transaction: t });
        await t.commit();

        return res.status(200).send({success: true, data: {id:addedStudent.id, ...req.body} });
    } catch (error) {
        await t.rollback();
        return res.status(400).send({success: false, error});
    }
})

router.patch("/updateStudent", async(req, res) => {
    const t = await sequelize.transaction();
    try {
        if(!req.body.id || !await student.findByPk(req.body.id) ){
            return res.status(200).send({message:"Invalid Data"});
        }
        if (req.body.optionalSubject) {
            const optionalSubjectData = await optionalSubject.findByPk(req.body.optionalSubject);
            if (optionalSubjectData) {
                req.body.optionalSubjectId = optionalSubjectData.id;
            } else {
                return res.status(200).send({ success: false, message: "Optional_Subject not found" });
            }
        }
        await student.update(req.body, {where:{id:req.body.id}} , { transaction: t });
        await parent.update({...req.body.parentDetails}, {where: {studentId: req.body.id}} , { transaction: t });
        await address.update({...req.body.address}, {where: {studentId: req.body.id}} , { transaction: t });
        await t.commit();

        return res.status(200).send({message:'success', data: req.body})
    } catch (error) {
        await t.rollback();
        return res.status(400).send({message:"Erorr", error });
    }
})

router.get("/getStudents", async(req, res) =>{
    try {
        let optionalSubjectId;
        //fetching based on optional_subject-wise
        if(req.query.subject){
            optionalSubjectId = await optionalSubject.findOne({where:{name:req.query.subject},attributes:['id']})
            if(!optionalSubjectId)
                return res.status(400).send({success:false, message: "Not found"})
            optionalSubjectId = {optionalSubjectId : optionalSubjectId.id}
        }
        const whereClause = optionalSubjectId ?  optionalSubjectId  : {}; 
        //eagerloading method
        const getStudents = await student.findAll({where:whereClause , 
                                attributes:{exclude:["createdAt", "updatedAt", "optionalSubjectId"]},
                                include: [ {model:parent, attributes:{exclude:["id"]}},
                                    {model:address, attributes:{exclude:["id"]}},
                                    {model: optionalSubject, attributes:{exclude:["id"]}}]
                                });
        return res.status(200).send({message:'success', data:getStudents});
    } catch (error) {
        return res.status(400).send({message:"Erorr", error });
    }
})

router.get("/getStudent/:id" , async(req, res) =>{
    try {
        if(!req.params.id || !await student.findByPk(req.params.id)){
            return res.status(200).send({message:"missing id"});
        }
        const getStudentId = await student.findOne({ where:{id: req.params.id},
                                attributes: { exclude:["createdAt", "updatedAt", "optionalSubjectId"] }, 
                                include:[{model:parent},{model:address}]
                            });
        return res.status(200).send({message:'success', data:getStudentId});
    } catch (error) {
        return res.status(400).send({message:"Erorr", error });
    }
})

router.delete("/deleteStudent/:id", async(req, res) => {
    try {
        if(!req.params.id || !await student.findByPk(req.params.id)){
            return res.status(200).send({message:"missing id"});
        }
        await student.destroy({where:{id: req.params.id}});
        return res.status(200).send({message:'success', data:"Deleted successfully "});
    } catch (error) {
        return res.status(400).send({message:"Erorr", error });
    }
})

module.exports = {router};

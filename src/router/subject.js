const express = require('express');
const router = express.Router();
const {student, parent, address, optionalSubject} = require("../models");
const {sequelize} = require("../../database/dbconnection")
router.use(express.json());

router.post("/addOptionalSubject", async(req, res) => {
    // creating the bulk the data same time
    // const data = [{name:"Zoology"}, {name:"Agriculture"},{name:"Horiculture"}]
    try {
        const { subjects} = req.body;
        const optionalSubjectData = await optionalSubject.bulkCreate(subjects.map(value => ({name:value}), {validator:true}));
        return res.status(200).send({message:"success", data:optionalSubjectData})
    } catch (error) {
        return res.status(400).send({success: false, error})
    }  
})

module.exports = {router};
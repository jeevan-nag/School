const express = require('express');
const router = express.Router();
const {student, parent, address, optionalSubject} = require("../models");
const {sequelize} = require("../../database/dbconnection")
router.use(express.json());

router.post("/addOptionalSubject", async(req, res) => {
    const data = [{name:"Zoology"}, {name:"Agriculture"},{name:"Horiculture"}]
    try {
        const optionalSubjectData = await optionalSubject.bulkCreate(data, {validator:true})
        return res.status(200).send({message:"Success", data:optionalSubjectData})
    } catch (error) {
        return res.status(400).send({Success: false, error})
    }  
})

module.exports = {router};
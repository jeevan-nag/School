
const {DataTypes} = require('sequelize');
const {sequelize} = require("../../database/dbconnection");

const address = sequelize.define("address", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric:true
        }
    },
    taluk: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:true
        }
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    pincode : {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate:{
            isNumeric: true,           
        }
    }
 },{
    timestamps: false // createdAt , updatedAt will not be created
 });

 module.exports = {address}
 
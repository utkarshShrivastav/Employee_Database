const mongoose =require("mongoose");
const shortId = require("shortid");

const EmployeeSchema = new mongoose.Schema({
    first:{
        type:String,
        required:true,
    },
    last:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
   
    phone:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

const Employee = mongoose.model("Employee",EmployeeSchema);

module.exports = Employee;
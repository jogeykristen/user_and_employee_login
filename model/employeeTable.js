const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    emp_id: {
        type: Number,
        required: true,
        unique: true
    },
    emp_name:{
        type: String,
        required:true
    },
    emp_mail:{
        type: String,
        required:true
    },
    emp_mobile:{
        type: String,
        required:true
    },
    emp_join_date:{
        type: Date,
        required:true
    },
    emp_dob:{
        type: Date,
        required:true
    },
    emp_department:{
        type: String,
        required:true
    },
    emp_designation:{
        type: String,
        required:true
    },
},{timestamps: true});


module.exports.Employee = model('Employee', userSchema);
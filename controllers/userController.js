const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('lodash');

const {User} = require('../model/userTable');
const {Employee} = require('../model/employeeTable');
//const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken')

const signToken = user =>{
    return jwt.sign({sub:user.id},process.env.JWT_SECERET_KEY)
}

module.exports.signUp = async(req,res)=>{
    const user =await User.findOne({
        user_mail:req.body.user_mail
    });

    
    if(user)return res.status(400).send("User already registered")
    //console.log("hello",User.generateJWT());
    
    const password = new User({user_id:req.body.user_id,
        user_mail:req.body.user_mail,
        user_name:req.body.user_name,
        user_mobile:req.body.user_mobile,
        user_password:req.body.user_password,
        user_status:req.body.user_status,
        //token:token
    })
    // const tok = new User(_.pick(req.body,["user_mail"]));
    // console.log("usaer ==",tok)
    
    const salt = await bcrypt.genSalt(10);
    const result =  await password.save();
    return res.status(200).send("User registeration successful");
}
module.exports.verify = async(req,res)=>{
    const find_user = await User.find({
        user_mail: req.body.user_mail,
        user_password: req.body.user_password
    });
    
    console.log("checking =",find_user)
    // const user_mail = req.body.user_mail;
    // console.log(user_mail)
    const token = signToken(find_user);
    if(find_user != ''){
        // const token = User.generateJWT();
        // console.log(token);
        return res.status(200).send({message:"logged in",
        data:token})}
    else{
        return res.status(400).send("incorrect mail id or password")
    }
    
}

function ensureToken(req,res,next){
    const bearerHeader = req.headers["Authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        console.log("token ==",bearerToken);
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
// console.log("ensuretoken = ",ensureToken())
module.exports.employeeCreate = async(req,res)=>{
    // const verifyToken = ensureToken();
    // jwt.verify(req.token,process.env.JWT_SECERET_KEY,(err,authData)=>{
    //     if(err){
    //         res.send("invalidtoken")
    //     }else{
    //         res.json({
    //             message:"created",
    //             authData
    //         })
    //     }
    // })
    const user =await Employee.findOne({
        emp_id:req.body.emp_id
    });
    if(user)return res.status(400).send("User already registered")
    console.log("hello");
    const password = new Employee({emp_id:req.body.emp_id,
        emp_mail:req.body.emp_mail,
        emp_name:req.body.emp_name,
        emp_mobile:req.body.emp_mobile,
        emp_join_date:req.body.emp_join_date,
        emp_dob:req.body.emp_dob,
        emp_department:req.body.emp_department,
        emp_designation:req.body.emp_designation})
    const salt = await bcrypt.genSalt(10);
    const result =  await password.save();
    return res.status(200).send("Employee registeration successful");
}

module.exports.employeeDelete = async(req,res)=>{
    const find_user = await Employee.find({
        emp_id: req.body.emp_id,
    });
    console.log("checking =",find_user)

    if(find_user != ''){
        const delete_user = await Employee.deleteOne({emp_id: req.body.emp_id})
        
        return res.status(200).send("deleted")}
    else{
        return res.status(400).send("incorrect mail id or password")
    }
    
}

module.exports.employeeUpdate = async(req,res)=>{
    
    const user =await Employee.findOne({
        emp_id:req.body.emp_id
    });
    if(user){//return res.status(400).send("User already registered")
        const password = await Employee.updateOne({emp_id:req.body.emp_id,
            emp_mail:req.body.emp_mail,
            emp_name:req.body.emp_name,
            emp_mobile:req.body.emp_mobile,
            emp_join_date:req.body.emp_join_date,
            emp_dob:req.body.emp_dob,
            emp_department:req.body.emp_department,
            emp_designation:req.body.emp_designation})
        const salt = await bcrypt.genSalt(10);
        
        return res.status(200).send({
            message:"Employee updated successful",
        });
    }
    else{
        return res.status(400).send("No users found")
    }
}

module.exports.employeeGet = async(req,res)=>{
    const filter = {};
    const all = await Employee.find(filter);
    console.log("all = ",all)
    
        
    return res.status(200).send({
            message:"Success",
            data:all
        })
    
    
}

module.exports.searchEmployee = async(req,res)=>{
    const employee = await Employee.findOne({
        emp_name: req.params.emp_name
    })
    if(employee){
        return res.status(200).send({
            message:"Success",
            data:employee
        })
    }else{
        return res.status(400).send({
            message:"No users found",
             
        })
    }
}
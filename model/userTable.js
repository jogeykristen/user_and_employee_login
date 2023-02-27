const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    user_name:{
        type: String,
        required:true
    },
    user_mail:{
        type: String,
        required:true
    },
    user_mobile:{
        type: String,
        required:true
    },
    user_password:{
        type: String,
        required:true
    },
    user_status:{
        type: String,
        required:true
    },
},{timestamps: true});

userSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id: this._id,
        user_mail: this.user_mail
    },process.env.JWT_SECERET_KEY,{expiresIn: "1d"})
}
module.exports.User = model('User', userSchema);
const mongoose = require('mongoose');
const Joi = require('Joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5
    },
    email : {
        type : String,
        unique : true,
        minlength : 10
    },
    password : {
        type : String,
        required : true 
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
});

userSchema.methods.generateAuth = function(){
    const token = jwt.sign({_id : this._id, isAdmin : this.isAdmin},config.get('privateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const userSchema = {
        name : Joi.string().min(5).required(),
        email : Joi.string().min(10).email().required(),
        password : Joi.string().min(5).required()
    }

    return Joi.validate(user,userSchema);
}

module.exports.User = User;
module.exports.validate = validateUser;
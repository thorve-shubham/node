const express = require('express');

const _ = require('lodash');
const Joi = require('Joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const router = express.Router();


//login for already registered users // no middleware
router.post('/', async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid email or Password');
    
    const valid = await bcrypt.compare(req.body.password,user.password);
    if(!valid) return res.status(400).send('Invalid email or password'); 
    
    const token = user.generateAuth();
    
    res.header('x-auth-token',token).send('Logged in Successfully ' + user.name);
});

function validate(auth){
    schema = {
        email : Joi.string().min(5).email().required(),
        password : Joi.string().min(5).required(),
    }

    return Joi.validate(auth,schema);
}

module.exports = router;
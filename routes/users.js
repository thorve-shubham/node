const bcrypt = require('bcrypt');
const {auth} = require('../middleware/auth');
//const asyncMiddleware = require('../middleware/async');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash')
const router = express.Router();
const {User,validate} = require('../models/user');


router.get('/me',auth , async (req,res)=>{
    const user = await User.findById(req.user._id).select({name :1});
    res.send(user);
});

//registering users and logging in them directly // no middleware needed
router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let  user = await User.findOne({email : req.body.email});
    if(user) return res.status(404).send("User already exits with this emailid");

    user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();

    const token = user.generateAuth();

    res.header('x-auth-token',token).send(_.pick(user,['name','email']));
});

module.exports = router;
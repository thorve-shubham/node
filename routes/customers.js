const express = require('express');
const mongoose = require('mongoose');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');
//const asyncMiddleware = require('../middleware/async');

const {Customer,validate} = require('../models/customer');

const router = express.Router();



router.get('/', async (req,res)=>{
    const customers = await Customer.find().sort({name : 1});
    res.send(customers);
});

router.post('/',[auth,admin] , async (req,res)=>{

    const {error} = validate(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    const customer = new Customer({
        isGold : req.body.isGold,
        name : req.body.name,
        phone : req.body.phone,
    });

    await customer.save();

    res.send(customer);
});

router.delete('/:id',[auth,admin] ,async (req,res)=>{
    const customer = await Customer.findByIdAndDelete({_id : req.params.id});

    if(!customer) return res.status(404).send("unable to delete the Customer");

    res.send(customer + " Deleted Successfully");
});

router.put('/:id',[auth,admin], async (req,res)=>{

    const {error} = validate(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate({_id : req.params.id},{
        name : req.body.name,
        isGold : req.body.isGold,
        phone : req.body.phone
    },{new : true});

    res.send(customer + " Successfully Updated");
});



module.exports = router;
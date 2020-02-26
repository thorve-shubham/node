const mongoose = require('mongoose');
const express = require('express');
const {Rental,validate} = require('../models/rental');
const {Customer} = require('../models/customer'); 
const {Movie} = require('../models/movie');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');
//const asyncMiddleware = require('../middleware/async');
const fawn = require('fawn');
fawn.init(mongoose);

const router = express.Router();

router.get('/', async (req,res)=>{
    const rental = await Rental.find().sort({ dateOut : -1 });
    res.send(rental);
});

router.post('/',[auth,admin] , async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);

    const customer =  await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Mentioned customer is invalid');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Mentioned movie is invalid');

    if(movie.numberInStock == 0) return res.status(404).send('Movie is not in stock');

    const rental = new Rental({
        customer : {
            name : customer.name,
            phone : customer.phone,
            _id : customer._id
        },
        movie : {
            title : movie.title,
            _id : movie._id,
            dailyRentalRate : movie.dailyRentalRate,
        },

    });
    
    new fawn.Task()
        .save('rentals',rental)
        .update('movies',{_id : movie._id},{ $inc : {numberInStock : -1}})
        .run();

    res.send(rental);
});

router.get('/:id',async (req,res)=>{
    const rental = await Rental.findById(req.params.id);

    if(!rental) return res.status(404).send('Rental for provided id is not present');

    res.send(rental);
});

module.exports = router;
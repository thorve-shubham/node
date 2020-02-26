const mongoose = require('mongoose');
const express = require('express');
const {Movie,validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');
//const asyncMiddleware = require('../middleware/async');

const router = express.Router();

router.get('/', async (req,res)=>{
    const movie = await Movie.find().sort({title : 1});

    res.send(movie);
});

router.post('/',[auth,admin] , async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send("Invalid Genre");

    const  movie = new Movie({
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);
});


module.exports = router;


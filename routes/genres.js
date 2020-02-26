const express = require('express');
const mongoose = require('mongoose');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');
//const asyncMiddleware = require('../middleware/async');
const { Genre, validate } = require('../models/genre');

const router = express.Router();
const Joi = require('joi');


router.get('/', async (req,res)=>{
    
    const genre = await Genre.find().sort({name : 1});
    res.send(genre);  
});

// router.get('/:id',(req,res)=>{
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send('Genre with provided id does not exist');
//     res.send(genre);
// });

router.post('/',[auth,admin] , async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name : req.body.name
    });

    await genre.save();
    res.send(genre + " Added successfullly ");

});

// router.post('/',(req,res)=>{
//     const {error} = validateGenre(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const genre = {
//         id : genres.length+1,
//         name : req.body.name
//     };

//     genres.push(genre);
//     console.log('genre added successfully');
//     res.send(genres);
// });

router.put('/:id',[auth,admin] , async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name : req.body.name},{new : true});

    if(!genre) return res.status(404).send("The genre is not present in the db");

    res.send(genre);
});


// router.put('/:id',(req,res)=>{
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send('Genre with provided id does not exist');

//     const {error} = validateGenre(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     genre.name = req.body.name;
//     console.log('Genre updated sucessfully');
//     res.send(genres);
// });

router.delete('/:id',[auth,admin] , async (req,res)=>{
    const genre = await Genre.findByIdAndRemove({ _id : req.params.id});
    if(!genre) return res.status(404).send("Cannot delete provided genre");

    res.send(genre + "Deleted Successful");

});

// router.delete('/:id', (req,res)=>{
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send('Genre with provided id does not exist');

//     const index = genres.indexOf(genre);
//     genres.splice(index,1);
//     console.log('Genre deleted successfully');
//     res.send(genres);
// });


module.exports = router;
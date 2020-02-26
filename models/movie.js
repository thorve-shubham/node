const mongoose = require('mongoose');
const Joi = require('Joi');

const {genreSchema} = require('./genre')

const Movie = mongoose.model('Movie',new mongoose.Schema({
    title :{
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    }, 
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255 
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 2,
        max : 20 
    }
}));

function validateMovie(movie){
    const movieSchema = {
        title : Joi.string().min(5).max(255).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).max(255).required(),
        dailyRentalRate : Joi.number().min(2).max(20).required(),
    }
    
    return Joi.validate(movie,movieSchema);

}

module.exports.validate = validateMovie;
module.exports.Movie = Movie;

const mongoose = require('mongoose');
const Joi = require('Joi');

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        minlength : 4,
        maxlength : 15
    }
});

const Genre = mongoose.model('Genre', genreSchema);


function validateGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(genre,schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
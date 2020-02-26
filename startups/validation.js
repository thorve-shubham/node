module.exports = function(){
    const Joi = require('Joi');
    Joi.ObjectId = require('joi-objectid')(Joi); 
}
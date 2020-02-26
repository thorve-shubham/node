const mongoose = require('mongoose');
const Joi = require('Joi');

const customerSchema = new mongoose.Schema({
    isGold :{type : Boolean, default : false },
    name : {type : String, required : true , minlength : 5, maxlength : 50},
    phone : {type : String, requiers : true , minlength : 10, maxlength : 10}
});

const Customer = mongoose.model("Customer" , customerSchema);

function validateCustomer(customer){
    const customerSchema = {
        name : Joi.string().min(5).max(50).required(),
        phone : Joi.string().min(10).max(10).required(),
        isGold : Joi.boolean()
    }

    return Joi.validate(customer,customerSchema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
module.exports.customerSchema = customerSchema;
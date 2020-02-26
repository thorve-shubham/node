require('dotenv').config();
const config = require('config');

module.exports = function(){
    if(!config.get('privateKey')){
        throw new Error("JWT Private Key Undefined");
    }
}
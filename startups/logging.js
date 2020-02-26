const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    process.on('unhandledRejection',(ex)=>{
        throw ex
    });
    
    winston.handleExceptions(new winston.transports.File({filename : 'uncaughtExceptions.log'}),
        new winston.transports.Console({colorize : true, prettyPrint : true}));
    
    winston.add(winston.transports.File,{filename : 'logs.log'});
    winston.add(winston.transports.MongoDB, {db : 'mongodb://localhost/Vidly', level : 'error'});
}

const express = require('express');
const winston = require('winston');

const app = express();
require('./startups/logging')();   //handling errors initially before 
require('./startups/myconfig')();  //loading config
require('./startups/routes')(app); // setting up routes and middlewares
require('./startups/dbconfig')();   // db connection
require('./startups/validation')();


app.listen(3000,()=>{
    winston.info('Server has started on port 3000');
});


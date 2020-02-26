const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied.NO token found');
    try{
        const decodedDoc = jwt.verify(token,config.get('privateKey')); //if not proper/ invalid token throws exception
        req.user = decodedDoc;
        next();
    }catch(err){
        return res.status(401).send('Access denied. Invalid token provided')
    }
}

module.exports.auth = auth;
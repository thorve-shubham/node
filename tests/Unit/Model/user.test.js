const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuth',()=>{
    it('Should match token',()=>{
        const data = {
            _id : new mongoose.Types.ObjectId().toHexString(),
            isAdmin : true
        }
        const user = new User(data);
        const token = user.generateAuth();
        const decoded = jwt.verify(token,config.get('privateKey'));
        expect(decoded).toMatchObject(data);
    })
    
})
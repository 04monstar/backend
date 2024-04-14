const express = require('express');
const {registerUser,dealerUser,adminUser,loginUser} = require('../usersHandle/info');
const  adminValidation = require('../utils/adminValidation');
const { userValidation } = require("../utils/userValidation");
const { dealerValidation }  = require('../utils/dealerValidation');
const { loginvalidate } = require('../utils/loginValidate')
const  Auth  = require('../utils/auth')
const routes = express.Router();

routes.post('/register',registerUser, userValidation); 
    
routes.post('/admin', adminUser,adminValidation); 

routes.post('/dealers', dealerUser,dealerValidation); 

routes.post('/login', loginUser, loginvalidate); 

routes.get('/users',Auth)



module.exports = routes;

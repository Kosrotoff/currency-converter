const {Router} = require('express');

const controller = require('../controllers/auth');


module.exports = Router()
    .post('/register', controller.register)
    .post('/login', controller.login);

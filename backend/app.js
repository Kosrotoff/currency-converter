const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const passportMiddleware = require('./middlewares/passport');

const authRoots = require('./routes/auth');


passportMiddleware(passport);


module.exports = express()
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors())
    .use(morgan(process.env['MORGAN_FORMAT']))
    .use(passport.initialize())
    .use('/api/auth', authRoots);

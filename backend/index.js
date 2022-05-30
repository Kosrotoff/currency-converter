require('dotenv').config();

const {cleanEnv, num, str} = require('envalid');
const mongoose = require('mongoose');
const app = require('./app');


const env = cleanEnv(process.env, {
    PORT: num(),
    MONGO_URI: str(),
    TOKEN_EXPIRATION_TIME: str(),
    JWT_SECRET_KEY: str(),
    MORGAN_FORMAT: str()
});


const server = app.listen(env.PORT, () => {
    console.log(`Server has been started...`)

    mongoose.connect(env.MONGO_URI)
        .then(() => console.log('MongoDB connected.'))
        .catch(error => {
            console.log(`Failed to connect to database: ${error.message}`);
            server.close();
        });
});

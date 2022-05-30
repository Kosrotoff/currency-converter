const {model, Schema} = require('mongoose');


const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});


module.exports = model('users', schema);

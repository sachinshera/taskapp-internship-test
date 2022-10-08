//import database
// user model for the database
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true

    },
    password:{
        type: String,
        required: true,
        
    },
    mobile:{
        type: Number,
    },
    address:{
        type: String,
    }
});

module.exports = {
    User: mongoose.model('User', userSchema)
}
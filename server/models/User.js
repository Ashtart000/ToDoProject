const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(v)
        }
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        validate: {
            validator: (v) => v <= new Date()
        }
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
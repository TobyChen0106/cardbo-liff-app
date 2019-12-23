const mongoose = require('mongoose')
const Card = require('./Card');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    lineID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    cards:{
        type: [Number],
        default: undefined,
    }
});

const User = mongoose.model('User', UserSchema, "users");
module.exports = User;
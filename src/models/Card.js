const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    cardID: {
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
});

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
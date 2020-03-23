const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OfferRecordSchema = require("./components/offer-record")
const StoreRecordSchema = require("./components/store-record")


// const setMongoMixedWithBadKeys = data =>
//     Array.isArray(data)
//         ? data.map(setMongoMixedWithBadKeys)
//         : typeof data === 'object'
//             ? Object.entries(data).reduce((a, [key, value]) => ({ ...a, [key.replace('.', '__').replace('$', '___')]: setMongoMixedWithBadKeys(value) }), {})
//             : data

// const getMongoMixedWithBadKeys = data =>
//     Array.isArray(data)
//         ? data.map(getMongoMixedWithBadKeys)
//         : typeof data === 'object'
//             ? Object.entries(data).reduce((a, [key, value]) => ({ ...a, [key.replace('__', '.').replace('___', '$')]: getMongoMixedWithBadKeys(value) }), {})
//             : data

const UserSchema = new Schema({
    lineID: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        default: '',
        // required: true
    },
    nickName: {
        type: String,
        default: '',
        // required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender: {
        type: String,
        default: '',
        // required: true
    },
    cards:{
        // cardID
        type: [String],
        default: undefined,
    },
    favoriteStores:{
        type: [StoreRecordSchema],
        default: [],
    },
    favoriteOffers:{
        type: [OfferRecordSchema],
        default: [],
    }
})

const User = mongoose.model('User', UserSchema, "users");
module.exports = User;
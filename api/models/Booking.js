const mongoose = require('mongoose')
const Place = require('./Place')
const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:Place},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    numberOfGuests: {type:Number, required:true},
    name: {type:String, required:true},
    mobile: {type:String, required:true},
    price: Number
})

module.exports = mongoose.model('bookingModel', bookingSchema)
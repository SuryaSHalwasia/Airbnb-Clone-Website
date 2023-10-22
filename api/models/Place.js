const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    addedPhotos: [String],
    description: String,
    features:[String],
    extraInfo:String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number
}
);

module.exports = mongoose.model('placeModel', placeSchema)
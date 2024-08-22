import mongoose from "mongoose";

const eaterySchema = new mongoose.Schema({
    name: String,
    category: String,
    cep: String,
    maxOcupancy: Number,
    address: String,
    latitude: Number,
    longitude: Number
});

let Eatery = mongoose.model('Eatery', eaterySchema);

export default Eatery;
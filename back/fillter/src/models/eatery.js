import mongoose from "mongoose";

const eaterySchema = new mongoose.Schema({
    name: String,
    category: String,
    address: String

});

let Eatery = mongoose.model('Eatery', eaterySchema);

export default Eatery;
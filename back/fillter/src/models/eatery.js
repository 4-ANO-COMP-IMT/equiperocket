import mongoose from "mongoose";

const eaterySchema = new mongoose.Schema({
    name: String,
    category: String,
    address: String,
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
    
});

let eatery = mongoose.model('Eatery', eaterySchema);

export default eatery;
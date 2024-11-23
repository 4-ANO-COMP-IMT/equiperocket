import mongoose from "mongoose";

const eaterySchema = new mongoose.Schema({
    name: String,
    category: String,
    cep: String,
    maxOcupancy: Number,
    address: String,
    location: {
        type: {type: String, default: 'Point', enum: ['Point']},
        coordinates: {type: [Number], required: true}

    },
    number: Number,
    CNPJ:{
        type: String
    },
    branchName:{
        type: String,
        unique: true
    },
    atualOcupancy: Number,
});

eaterySchema.index({location: '2dsphere'});
let Eatery = mongoose.model('Eatery', eaterySchema);

export default Eatery;

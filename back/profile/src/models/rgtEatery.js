import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: String,
    CNPJ:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
});

let rgtEatery = mongoose.model('rgtEatery', profileSchema);
export default rgtEatery;
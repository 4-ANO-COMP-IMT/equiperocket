import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

let profile = mongoose.model('Profile', profileSchema);
export default profile;
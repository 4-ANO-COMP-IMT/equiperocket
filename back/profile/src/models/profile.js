import mongoose from 'mongoose';
import User from '../entities/user.js';

const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

profileSchema.methods.toEntity = function toEntity() {
    return new User(this.email, this.password, this.name);
}

profileSchema.statics.toEntity = function toEntity(profile) {
    return new this({
        email: profile.getEmail(),
        password: profile.getPassword(),
        name: profile.getName()
    });
}

export default mongoose.model('Profile', profileSchema);
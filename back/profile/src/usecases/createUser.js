import profile from "../models/profile.js";
import User from "../entities/user.js";

async function createUser(profileData){
    try {
        const user = new User(profileData.email, profileData.password, profileData.name);
        const profileModel = profile.fromEntity(user);
        await profileModel.save();
        return profileModel.toEntity
    } catch (error) {
        return error.message;
    }
}
export  {createUser};
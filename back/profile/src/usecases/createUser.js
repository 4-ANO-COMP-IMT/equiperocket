import profile from "../models/profile.js";


async function createUser(profileData){
    try {
       const profileDoc = new profile(profileData);
       await profileDoc.save();
       return profileDoc;
    } catch (error) {
        return error.message;
    }
}
export  {createUser};
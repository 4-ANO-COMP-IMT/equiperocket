import profile from "../models/profile.js";
import rgtEatery from "../models/rgtEatery.js";


async function createUser(profileData){
    try {
       const profileDoc = new profile(profileData);
       await profileDoc.save();
       return profileDoc;
    } catch (error) {
        return error.message;
    }
}

async function createEatery(eateryData){
    try {
       const eateryDoc = new rgtEatery(eateryData);
       await eateryDoc.save();
       return eateryDoc;
    } catch (error) {
        return error.message;
    }
}
export  {createUser, createEatery};
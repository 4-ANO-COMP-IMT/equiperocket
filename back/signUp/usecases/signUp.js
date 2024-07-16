import { addUser, getUserByEmail } from "../models/userModel";


async function signUp(User) {   
    let filteredUser = await getUserByEmail(User); 
        let success = false;
    if(!filteredUser || filteredUser.email !== User.email) {
        addUser(User);
        success = true;
    }
    return success;
};




export default {
    signUp
};
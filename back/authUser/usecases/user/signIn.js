// Purpouse: Function that allows the user to sign in.

import { getUserByEmail } from "../../models/userModel";


async function signIn(User) {
    let success = false;
    const filteredUsers = await getUserByEmail(User);    
    if (filteredUsers && filteredUsers.password == User.password ) {
        
        success = true;
    }
    return success;
};



export default {signIn};

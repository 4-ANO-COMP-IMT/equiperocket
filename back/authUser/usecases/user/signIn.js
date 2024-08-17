// Purpouse: Function that allows the user to sign in.

const { getUserByEmail } = require ("../../models/userModel");


async function signIn(User) {
    let success = false;
    const filteredUsers = await getUserByEmail(User);    
    if (filteredUsers && filteredUsers.password == User.password ) {
        
        success = true;
    }
    return success;
};



module.exports = {signIn};

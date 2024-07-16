const { addUser, getUserByEmail } = require("../models/userModel.cjs");


async function signUp(User) {   
    let filteredUser = await getUserByEmail(User); 
        let success = false;
    if(!filteredUser || filteredUser.email !== User.email) {
       await addUser(User);
        success = true;
    }
    return success;
};




module.exports = {signUp};
const {User} = require("../../entities/user.js");
const {getUserByEmail} = require("./signIn.js");

async function userProfile(User){
    
    const filteredUser = await getUserByEmail(User);
    return filteredUser;
}

module.exports = {
    userProfile
};
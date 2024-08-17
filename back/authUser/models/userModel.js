const fs = require('fs');
const path = require('path');
const User = require('../entities/user.js');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


async function addUser(user) { 
    const newUserId = Object.keys(users).length + 1;
    
    const newuser = new User(user.email, user.password, user.name);
    const newUserList = {...users};
    newUserList[newUserId.toString()] = newuser;
    fs.writeFileSync(usersFilePath, JSON.stringify(newUserList, null, 2));
}; 

function getUserByEmail(User) {
    const userArray = Object.values(users);
    const filteredUser = userArray.find(user =>  user.email === User.email );
   
    return filteredUser;
};



module.exports = {
   addUser,
   getUserByEmail
};


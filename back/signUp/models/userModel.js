import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import User from '../entities/user.js';

const usersFilePath = join(__dirname, '../data/users.json');
let users = JSON.parse(readFileSync(usersFilePath, "utf-8"));


async function addUser(user) { 
    const newUserId = Object.keys(users).length + 1;
    
    const newuser = new User(user.email, user.password, user.name);
    const newUserList = {...users};
    newUserList[newUserId.toString()] = newuser;
    writeFileSync(usersFilePath, JSON.stringify(newUserList, null, 2));
}; 

function getUserByEmail(User) {
    const userArray = Object.values(users);
    const filteredUser = userArray.find(user =>  user.email === User.email );
   
    return filteredUser;
};



export default {
   addUser,
   getUserByEmail
};


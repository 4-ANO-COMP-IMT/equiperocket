const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {...user}; 
    console.log(payload);
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
   
    return token;
};

function verifyToken(token) {
   try{ 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
    }catch(err){
        return;
    } 
}

module.exports = { 
    generateToken, 
    verifyToken 
};
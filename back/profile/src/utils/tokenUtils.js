import jwt  from 'jsonwebtoken';

const key =  'mySecret';


function verifyToken(token) {
   try{ 
    const decoded = jwt.verify(token, key);
    return decoded;
    }catch(err){
        return null;
    } 
}

export {verifyToken}; 
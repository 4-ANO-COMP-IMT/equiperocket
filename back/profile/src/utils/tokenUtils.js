import verify  from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'mySecret';


function verifyToken(token) {
   try{ 
    const decoded = verify(token, key);
    return decoded;
    }catch(err){
        return;
    } 
}

export {verifyToken}; 
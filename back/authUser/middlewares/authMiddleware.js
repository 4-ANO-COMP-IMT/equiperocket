const { verifyToken } = require("../utils/tokenUtils");


function authMiddlewere(req,res,next){
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error:"Acesso negado" });
    try {
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token invalido" });
        const user = verifyToken(token);
        if (!user) return res.status(401).json({ error: "Token invalido" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
   }
   
    
   
};

module.exports  = {
    authMiddlewere
};
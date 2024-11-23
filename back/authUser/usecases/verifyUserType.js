
function verifyUserType(CPF, CNPJ){
    try {
        if (CPF && CPF !== null){
            return "user";
        }else if (CNPJ && CNPJ !== null){   
            return "restaurant";
        }else {
            throw new Error("Erro ao verificar tipo de usuário ou tipo de usuário invalido");
        }
    } catch (error) {
        return error.message;
    }
    
}
module.exports = {
    verifyUserType
};
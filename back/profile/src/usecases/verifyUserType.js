
function verifyUserType(data){
    try {
        const { cpf, CNPJ } = data;
        if (cpf && cpf !== null){
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
export {
    verifyUserType
};
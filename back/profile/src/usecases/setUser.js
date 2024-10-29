import profile from "../models/profile.js";
import rgtEatery from "../models/rgtEatery.js";

async function setUser(identifier,updateData){
    try {
        const profileModel = await profile.findOneAndUpdate({ CPF:identifier }, updateData, { new: true });
        if(!profileModel){
            const eateryModel = await rgtEatery.findOneAndUpdate({ CNPJ:identifier }, updateData, { new: true });
            if(!eateryModel){
                throw new Error("Erro ao salvar usuário");
            }
            return eateryModel;
        }
        return profileModel;
    } catch (error) {
        return error.message;
    }
}
export  {setUser};
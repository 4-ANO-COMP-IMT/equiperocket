import profile from "../models/profile.js";
import rgtEatery from "../models/rgtEatery.js";

async function getUser(email){
    try {
        const profileModel = await profile.findOne({email,CPF});
        if(!profileModel){
            const eateryModel = await rgtEatery.findOne({email,CNPJ});
            return eateryModel; 
        };
        if(!eateryModel && !profileModel){
            throw new Error("Usuário não é um cliente ou restaurante");
        }
        return profileModel;

    } catch (error) {
        return error.message;
    }
}
export  {getUser};
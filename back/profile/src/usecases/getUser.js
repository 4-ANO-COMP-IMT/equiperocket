import profile from "../models/profile.js";
import rgtEatery from "../models/rgtEatery.js";

async function getUser(email){
    try {
        const profileModel = await profile.findOne({email});
        const teste = "mari@gmail.com";
        const a = await profile.findOne({email: teste});
        console.log("teste", a);
        if(!profileModel){
            const rgtEateryModel = await rgtEatery.findOne({email});
            if(!rgtEateryModel && !profileModel){
                throw new Error("Usuário não é um cliente ou restaurante");
            }
            return rgtEateryModel; 
        };
       
        return profileModel;

    } catch (error) {
        return error.message;
    }
}
export  {getUser};
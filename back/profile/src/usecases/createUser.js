import profile from "../models/profile.js";
import rgtEatery from "../models/rgtEatery.js";


async function createUser(profileData){
    console.log(profileData);
    console.log("createUser here");
    try {
        const exists = await profile.findOne({cpf: profileData.cpf});
        console.log(exists);
        if(!profileData.cpf){
            throw new Error("CPF não informado");
        }
        if(exists){
            throw new Error("CPF já cadastrado");
        }
        const profileDoc = new profile(profileData);
        await profileDoc.save();
        return profileDoc;
    } catch (error) {
        return error.message;
    }
}

async function createEatery(eateryData){
    try {
        const exists = await rgtEatery.findOne({CNPJ: eateryData.CNPJ});
        if(!eateryData.CNPJ){
            throw new Error("CNPJ não informado");  
        }
        if(exists){
            throw new Error("CNPJ já cadastrado");
        }  
       const eateryDoc = new rgtEatery(eateryData);
       await eateryDoc.save();
       return eateryDoc;
    } catch (error) {
        return error.message;
    }
}
export  {createUser, createEatery};
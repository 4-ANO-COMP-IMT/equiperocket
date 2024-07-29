import profile from "../models/profile.js";


async function getUser(email){
    try {
        const profileModel = await profile.findOne({email});
        if(!profileModel){
            throw new Error("Usuário não encontrado");
        };
        return profileModel;

    } catch (error) {
        return error.message;
    }
}
export  {getUser};
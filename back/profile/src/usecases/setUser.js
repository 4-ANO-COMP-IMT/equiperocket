import profile from "../models/profile.js";

async function setUser(email, updateData){
    try {
        const profileModel = await profile.findOneAndUpdate({ email }, updateData, { new: true });
        if(!profileModel){
            throw new Error("Erro ao salvar usuário");
        }
        return profileModel.toEntity();
    } catch (error) {
        return error.message;
    }
}
export  {setUser};
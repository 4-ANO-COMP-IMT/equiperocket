import Eatery from "../models/eatery";

export async function updateOcuancy(cnpj, ocupancy){
    try {
        const eatery = await Eatery.findOneAndUpdate(
            {cnpj: cnpj},
            {atualOcupancy: ocupancy},
            {new: true}
        );
        if(eatery === null){
            return null;
        }
       
        return eatery;
    } catch (error) {
        return error.message;
    }
}
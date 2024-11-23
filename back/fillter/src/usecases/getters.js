import Eatery from "../models/eatery.js";


export async function getCategory(category){
    try {
        const eatery = await Eatery.find({category: category});
        if(eatery.length === 0){
            return null;
        }
        
        return eatery;
    } catch (error) {
        return error.message;   
    }
};

export async function getName(name){
    try {
        const eatery = await Eatery.find({name: name});
        if(eatery.length === 0){
            return null;
        }
        
        return eatery;
    } catch (error) {
        return error.message;   
    }
};

export async function getCNPJ(CNPJ){
    try {
        const eatery = await Eatery.find({CNPJ: CNPJ});
        if(eatery.length === 0){
            return null;
        }
        
        return eatery;
    } catch (error) {
        return error.message;   
    }
}


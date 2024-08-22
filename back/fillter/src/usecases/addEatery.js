import Eatery from "../models/eatery";

async function addEatery(eateryData){
    try {
        const eateryDoc = new Eatery(eateryData);
        await eateryDoc.save();
        return eateryDoc;
    } catch (error) {
        return error.message;
    }
};
export  {addEatery};
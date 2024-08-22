import Eatery from '../models/eatery.js';

async function setEatery(eateryData){
    try {
        const eateryDoc = new Eatery(eateryData);
        await eateryDoc.save();
        return eateryDoc;
    } catch (error) {
        return error.message;
    }
};
export  {setEatery};
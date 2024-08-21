import getAllEatery from "../models/eatery.js";



export function getName(name){
    let json = null;
    
    if(name.trim() !== ""){
        const eateries = getAllEatery();
        const eateryArray = Object.values(eateries);
        const filteredEatery = eateryArray.find(eatery => eatery.name.trim().toLowerCase() === name.trim().toLowerCase());
        json = JSON.stringify(filteredEatery);
    }
    return json; 
};

export default getName;
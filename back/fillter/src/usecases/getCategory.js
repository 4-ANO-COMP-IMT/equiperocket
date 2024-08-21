import getAllEatery from "../models/eatery.js";


export function getCategory(category){
    let json = null;
    console.log(category)
    if(category.trim() !== ""){
        const eateries = getAllEatery();
        const eateryArray = Object.values(eateries);
        const filteredEatery = eateryArray.filter(eatery => eatery.category.trim().toLowerCase() === category.trim().toLowerCase());
        json = JSON.stringify(filteredEatery);
    }

    return json;
    
};

export default getCategory;
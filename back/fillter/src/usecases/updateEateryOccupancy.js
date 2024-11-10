import Eatery from "../models/eatery.js";


function normalizeName(name) {
    return name.trim();
}

async function updateEateryOccupancy(cnpj, nome, ocupancy) {
    try {
        // Normaliza apenas o nome
        const normalizedName = normalizeName(nome);
        
        console.log(`Consultando: CNPJ: ${cnpj}, Nome: ${normalizedName}, Ocupação: ${ocupancy}`);
        
        const eatery = await Eatery.findOneAndUpdate(
            { CNPJ: cnpj, name: normalizedName },  
            { atualOcupancy: ocupancy },
            { new: true }  
        );

        if (!eatery) {
            console.log("Restaurante não encontrado.");
            return null;  
        }

        console.log("Restaurante atualizado:", eatery);
        return eatery; 
        
    } catch (error) {
        console.error("Erro ao atualizar ocupação:", error.message);
        return error.message; 
    }
}

export { updateEateryOccupancy };

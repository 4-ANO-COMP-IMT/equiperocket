import axios from "axios";

// Criação da instância do Axios com a baseURL
const restaurantApi = axios.create({ baseURL: "http://localhost:6000" });

// Função para obter a lista de restaurantes
async function getRestaurants() {
    try {
        const response = await restaurantApi.get('/restaurant');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter restaurantes:", error);
        throw error;
    }
}

// Função para obter restaurantes próximos com base em latitude, longitude e raio
async function getNearby(lat, long, rad) {
    try {
        const response = await restaurantApi.get(`/restaurants/nearby`, {
            params: {
                lat: lat,
                long: long,
                rad: rad
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter restaurantes próximos:", error.message);
        console.error("Configuração da requisição:", error.config);
        console.error("Resposta do servidor:", error.response);
        throw error;
    }
}

export {
    getRestaurants,
    getNearby
}

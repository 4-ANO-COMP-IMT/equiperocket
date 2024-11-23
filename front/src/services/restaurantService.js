import axios from "axios";

// Criação da instância do Axios com a baseURL
const restaurantApi = axios.create({ baseURL: "http://localhost:9090" });


function getRandomOcupancy(maxOccupancy) {
    const max = Number(maxOccupancy);
    if (isNaN(max) || max <= 0) return 0;
    return Math.floor(Math.random() * (max + 1));
  }

// Função para obter a lista de restaurantes
async function getRestaurants() {
    try {
        const response = await restaurantApi.post('/restaurants');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter restaurantes:", error.config);
        if (error.response) {
            // O servidor respondeu com um código de status fora do intervalo 2xx
            console.error("Erro do servidor:", error.response.status);
            console.error("Dados da resposta:", error.response.data);
        } else if (error.request) {
            // A requisição foi feita, mas nenhuma resposta foi recebida
            console.error("Nenhuma resposta recebida:", error.request);
        } else {
            // Algo aconteceu ao configurar a requisição que gerou o erro
            console.error("Erro na configuração da requisição:", error.message);
        }
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
        const data = response.data.map(restaurant => ({
            ...restaurant,
            maxOcupancy: Number(restaurant.maxOcupancy), // Certifique-se de que maxOcupancy é um número
            currentOccupancy: getRandomOcupancy(Number(restaurant.maxOcupancy)) 
        }));
        return data;
    } catch (error) {
        console.error("Erro ao obter restaurantes:", error.config);
        if (error.response) {
            // O servidor respondeu com um código de status fora do intervalo 2xx
            console.error("Erro do servidor:", error.response.status);
            console.error("Dados da resposta:", error.response.data);
        } else if (error.request) {
            // A requisição foi feita, mas nenhuma resposta foi recebida
            console.error("Nenhuma resposta recebida:", error.request);
        } else {
            // Algo aconteceu ao configurar a requisição que gerou o erro
            console.error("Erro na configuração da requisição:", error.message);
        }
        throw error;
    }
}

export {
    getRestaurants,
    getNearby
}

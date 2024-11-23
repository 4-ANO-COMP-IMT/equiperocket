import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyDwjSFr2vJI98vVdauNTYdEFHgLO4cl8c0';

async function getCoordinates(endereco) {
    if(!apiKey){
        throw new Error('API key not found');
    }
    console.log(endereco);
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: endereco,
        key: apiKey
      }
    });
    
    if (response.data.status !== 'OK') {
      console.log(response.data);
      throw new Error('Erro ao obter coordenadas');
    }
    
    const location = response.data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng
    };
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao consultar coordenadas: ' + error.message);
  }
}
export { getCoordinates };
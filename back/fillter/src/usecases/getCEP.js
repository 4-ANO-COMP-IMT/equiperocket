import axios from "axios";

async function getCEP(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}
export default getCEP;
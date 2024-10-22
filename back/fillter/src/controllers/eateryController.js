//Pegar as entidadese e os usecases para req e res e passar para as rotas
import { getCategory, getName} from '../usecases/getters.js';
import { publishEvent } from '../common/publisher.js';
import { subscribeToEvent } from '../common/subscriber.js';
import { getCEP } from '../usecases/getCEP.js';
import { getCoordinates } from '../usecases/getCoordinates.js';  
import { setEatery } from '../usecases/setEatery.js';
import Eatery from '../models/eatery.js';


let userType = null;
async function initSubscriber(){
    subscribeToEvent('user_auth', (message) => {
        userType = message.type;
        console.log('User created event received:', message);
    });
    
}

initSubscriber();

async function getEatery(req, res){
    try {
       const eateries = await Eatery.find();
       return res.status(200).json(eateries);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
async function getEateryNearby(req, res){
    try {
        const {lat, long,rad} = req.query;
        if(!lat || !long || !rad){
            return res.status(400).json({error: "Missing parameters"});
        }
        const userLat = parseFloat(lat);
        const userLong = parseFloat(long);
        const userRadius = parseInt(rad);
        

        const nearby = await Eatery.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [userLong, userLat]
                    },
                    $maxDistance: userRadius 
                }
            }
        });
    
        if(nearby.length === 0){
            return res.status(404).json({error: "Nenhum restaurante encontrado"});
        }
        return res.status(200).json(nearby);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};  
async function getEateryById(req, res){
    try {
        const eatery = Eatery.findById(req.params.id);
        if(eatery){
            return res.status(200).json(eatery);
        }else{
            return res.status(404).json({error: "Restaurante não encontrado"});
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
async function addEatery(req, res){
    try {
        if(userType !== 'restaurant'){
            return res.status(403).json({error: "Usuário não autorizado"});
        }
        const {id, name, category, cep, maxOcupancy, number, cnpj, branchName} = req.body;
        if(!name || !category || !cep || !maxOcupancy || !id || !number || !cnpj || !branchName){
            return res.status(400).json({error: "Missing parameters"});
        }
        const fullAddress = await getCEP(cep);
        const address = `${fullAddress.logradouro}, 
            ${fullAddress.bairro},
            ${fullAddress.localidade}, 
            ${fullAddress.uf} , 
            ${fullAddress.cep}`;
        const eateryExists = await Eatery.findOne({
            name:name, 
            address: address,
            branchName: branchName
        });
        if(eateryExists){
            return res.status(409).json({error: "Restaurante já cadastrado"});
        }
        const {latitude, longitude} = await getCoordinates(address);
        const eateryData = {
            name,
            category,
            cep,
            maxOcupancy,
            address,
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            cnpj,
            branchName,
            atualOcupancy: 0

        };
        const eatery = await setEatery(eateryData);
        return res.status(201).json(eatery);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
async function getEateryByCategory(req, res){
    try {
        const category = req.params.category;
        const eateries = getCategory(category);
        if(eateries){
            return res.status(200).json(eateries);
        }else{
            return res.status(404).json({error: "Restaurante não encontrado nessa categoria"});
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
async function getEateryByName(req, res){
    try {
        const name = req.params.name;
        const eateries = Eatery.getName(name);
        if(eateries){
            return res.status(200).json(eateries);
        }else{
            return res.status(404).json({error: "Restaurante não encontrado com esse nome"});
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
async function getEateryByCNPJ(req,res) {
    try{
        const cnpj = req.params.cnpj;
        const eateries = Eatery.find({CNPJ:cnpj});
        if(eateries){
            return res.status(200).json(eateries);
        }else{
            return res.status(404).json({error: "Restaurante não encontrado com esse CNPJ"});
        }
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}
async function updateOcuancy(req, res){
    try {
        const {cnpj, ocupancy} = req.body;
        if(!cnpj || !ocupancy){
            return res.status(400).json({error: "Missing parameters"});
        }
        if(userType !== 'restaurant'){
            return res.status(403).json({error: "Usuário não autorizado"});
        }
        let eatery = updateOcuancy(cnpj, ocupancy);
        if(eatery === null){
            return res.status(404).json({error: "Restaurante não encontrado"});
        }
        
        publishEvent('ocupancy_updated', {cnpj, ocupancy});
        return res.status(200).json(eatery);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
    
}
export { getEatery, getEateryNearby, getEateryById, addEatery, getEateryByCategory, getEateryByName, getEateryByCNPJ,updateOcuancy}; 

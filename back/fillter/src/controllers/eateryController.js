//Pegar as entidadese e os usecases para req e res e passar para as rotas

import { getCategory, getName} from '../usecases/getters.js';
import { publishEvent } from '../common/publisher.js';
import { subscribeToEvent } from '../common/subscriber.js';
import { getCep } from '../usecases/getCEP.js';
import { getCoordinates } from '../usecases/getCoordinates.js';  
import { addEatery } from '../usecases/addEatery.js';
import Eatery from '../models/eatery.js';


async function initSubscriber(){
    subscribeToEvent('user_auth', (message) => {
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
    const {latitude, longitude,radius} = req.querry;
    try {
        const nearby = Eatery.find({
            latitude: {$gte: latitude - radius, $lte: latitude + radius},
             longitude: {$gte: longitude - radius, $lte: longitude + radius}
        });
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
    const {name, category, cep, maxOcupancy} = req.body;
    if(!name || !category || !cep || !maxOcupancy){
        return res.status(400).json({error: "Missing parameters"});
    }
    try {
        const fullAddress = await getCep(cep);
        const address = `${fullAddress.logradouro}, 
            ${fullAddress.bairro},
            ${fullAddress.localidade}, 
            ${fullAddress.uf} , 
            ${fullAddress.cep}`;
        const {latitude, longitude} = await getCoordinates(address);
        const eateryData = {
            name,
            category,
            cep,
            maxOcupancy,
            address,
            latitude,
            longitude
        };
        const eatery = await addEatery(eateryData);
        return res.status(201).json(eatery);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
async function getEateryByCategory(req, res){
    try {
        const category = req.params.category;
        const eateries = Eatery.getCategory(category);
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

export default{ getEatery, getEateryNearby, getEateryById, addEatery, getEateryByCategory, getEateryByName};

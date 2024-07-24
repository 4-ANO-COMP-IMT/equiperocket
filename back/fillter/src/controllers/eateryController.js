//Pegar as entidadese e os usecases para req e res e passar para as rotas

import  getCategory  from '../usecases/getCategory.js';
import  getName  from '../usecases/getName.js';
import { publishEvent } from '../common/publisher.js';
import { subscribeToEvent } from '../common/subscriber.js';

async function initSubscriber(){
    subscribeToEvent('user_auth', (message) => {
        console.log('User created event received:', message);
        // TODO: Implementar a lógica de adicionar o usuário no banco de dados
    });
}

initSubscriber();

function getEatery(req, res){
    try {
        const eatery = req.body;        
        let filteredEatery = null;
        if(eatery.name !== undefined && eatery.name !== null){
            filteredEatery = getName(eatery.name);
        }else if(eatery.category !== undefined && eatery.category !== null){
           
            filteredEatery = getCategory(eatery.category);
        }
        if(filteredEatery === null){
            
            return res.status(400).send("Bad Request");
        }else{
            
            return res.status(200).json(filteredEatery);
        }	
    } catch (error) {
        res.status(500);
        return res.send(error.message);
    }
};



export default getEatery;

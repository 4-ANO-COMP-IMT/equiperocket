import { getUser } from './getUser.js';
import { verifyToken } from "../utils/tokenUtils.js";



const TIMEOUT_DURATION = 5000;
async function getProfile(email,token){
    try {
        console.log(email,token)
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Tempo de espera excedido.')), TIMEOUT_DURATION)
        );
    
        const response = await Promise.race([ 
            new Promise(async (resolve, reject) => {
                console.log('Esperando resposta do serviço de autenticação...');
                    try {
                        console.log('Token:', token);
                        if (!token) {
                            reject(new Error('Token não disponivel.'));
                        }
                        const verify = verifyToken(token);
                        console.log('Token verificado:', verify);
                        if (verify) {
                            const user = await getUser(email);
                            console.log(user);
                            resolve(user);
                        } else {
                            reject(new Error('Usuário não autenticado.'));
                        }
                    } catch (error) {
                        reject(error);
                    } 
            }), 
            timeout
        ]);
        return response;
    }catch (error) {
        return error.message;
    }
    }
export  {getProfile};
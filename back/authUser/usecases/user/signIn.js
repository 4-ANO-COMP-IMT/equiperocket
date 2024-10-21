const { publishEvent } = require('../../common/publisher');
const { subscribeToEvent, purgeQueue, unsubscribeFromEvent } = require('../../common/subscriber');
const {verifyUserType} = require("../verifyUserType.js");

const TIMEOUT_DURATION = 5000;

async function signIn(user) {
    try {
        const data = JSON.stringify(user);

        // Limpar a fila antes de processar uma nova tentativa de login
        await purgeQueue('response.user');

        // Publicar o evento de autenticação
        await publishEvent('auth.user', data);

        // Criar a promessa de timeout
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Tempo de espera excedido.')), TIMEOUT_DURATION)
        );

        // Criar a promessa para receber a resposta do evento de autenticação
        const response = await Promise.race([
            new Promise((resolve, reject) => {
                const onMessage = (msg) => {
                    try {
                        const data = JSON.parse(msg);
                        if (data.email === user.email && data.password === user.password) {
                            const userType = verifyUserType(data.CPF,data.CNPJ); 
                            resolve(data,userType);  
                        } else {
                            resolve(false); 
                        }
                        unsubscribeFromEvent('auth.res', onMessage);
                    } catch (error) {
                        unsubscribeFromEvent('auth.res', onMessage);
                        reject(new Error('Erro ao processar a resposta do evento.'));
                    }
                };

                subscribeToEvent('auth.res', onMessage);
            }), 
            timeout
        ]);

        return response ? true : false;

    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error.message);
        return false; // Retorna false para indicar falha
    }
};

module.exports = {
    signIn
};

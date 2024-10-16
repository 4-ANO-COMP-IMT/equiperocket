const { publishEvent } = require('../common/publisher');
const { subscribeToEvent, purgeQueue } = require('../common/subscriber');


const TIMEOUT_DURATION = 5000;
async function signUp(user) {
    try {
        const data = JSON.stringify(user);
        await publishEvent('request.use', data);

        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Tempo de espera excedido.')), TIMEOUT_DURATION)
        );
        const response = await Promise.race([ 
            new Promise((resolve, reject) => {
                subscribeToEvent('response.user', async (msg) => {
                    try {
                        const data = JSON.parse(msg);
                        if (!data) {
                            reject(new Error('Erro ao processar a resposta do evento.'));
                        }
                        resolve(data);
                    } catch (error) {
                       return ('Erro ao processar a resposta do evento.');
                    }
                });
            }), 
            timeout
        ]);
        let found = true;
        if (response.email === user.email) {
            found = false;
        }
        return found;
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error.message);
        return ('Não foi possível buscar o usuário.');
    }finally{
        try {
            await purgeQueue('response.user');
        } catch (error) {
            console.error('Erro ao limpar a fila:', error);
        }
    }
}

module.exports = {
    signUp
};

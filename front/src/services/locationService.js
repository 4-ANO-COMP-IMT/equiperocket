export  function getLocation(){
    return new Promise((resolve, reject) => {
        let timedOut = false;
        let timeoutTimer;
        const handleLocationSuccess = (position) => {
            clearTimeout(timeoutTimer);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Localização do usuário obtida com sucesso.");
            resolve({
                latitude: latitude,
                longitude: longitude,
                userAccepted: true
            });
        };
        const handleLocationError = (error) => {
            if (!timedOut) {
                clearTimeout(timeoutTimer);
                console.warn("Não foi possível obter a localização do usuário:", error.message);
                resolve({
                    latitude: -23.550520, // Coordenadas de fallback (São Paulo, por exemplo)
                    longitude: -46.633308,
                    userAccepted: false
                });
            }
        };
    
        try {
            window.navigator.geolocation.getCurrentPosition(
                handleLocationSuccess,
                handleLocationError);
                 timeoutTimer = setTimeout(() => {
                    timedOut = true;
                    console.warn("Tempo limite atingido ao tentar obter a localização do usuário.");
                    resolve({
                        userAccepted: false
                    });
                }, 10000); // Timeout de 10 segundos (ajuste conforme necessário)
        } catch (error) {
            console.error("Erro ao obter localização:", error.message);
            reject(error);
        }
        

    });
}

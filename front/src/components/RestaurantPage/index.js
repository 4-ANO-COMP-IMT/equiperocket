import React, { useEffect, useState } from "react";
import {  getLocation } from "../../services/locationService.js";
import axios from "axios";

function RestaurantsPage(){
    const[restaurants, setRestaurants] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        console.log("Buscando restaurantes próximos...");
        async function fetchRestaurants(){
            try{
                const location = await getLocation();
                
                if(location.userAccepted){
                    const response = await axios.get("http://localhost:6000/", {
                        params: {
                            lat: location.latitude,
                            long: location.longitude,
                            rad: 5000 // Adicione um valor de raio como exemplo, pode ajustar conforme necessário
                        }
                    });
                    setRestaurants(response.data);
                }else{
                    setRestaurants([]);
                }
            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
        fetchRestaurants();
    },[]);

    if(loading){
        return <p>Carregando...</p>;
    }
    if(error){
        return <p>Erro ao carregar restaurantes: {error.message}</p>;
    }

    return (
        <div>
            <h1>Restaurantes Próximos</h1>
            {restaurants.length > 0 ? (
                <ul>
                    {restaurants.map(restaurant => (
                        <li key={restaurant.id}> {restaurant.name} - {restaurant.address}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum restaurante encontrado.</p>
            )}
        </div>
    );
    
       
}

export default RestaurantsPage;
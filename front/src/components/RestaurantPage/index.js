import React, { useEffect, useState } from "react";
import {  getLocation } from "../../services/locationService.js";
import { getRestaurants, getNearby } from "../../services/restaurantService.js";

function RestaurantsPage(){
    const[restaurants, setRestaurants] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        console.log("Buscando restaurantes próximos...");
        async function fetchRestaurants(){
            try{
                const response = await getRestaurants();
                
                if(!response){
                    throw new Error("Erro ao buscar restaurantes");
                }
                if(response.length === 0){
                    throw new Error("Nenhum restaurante encontrado");
                };               
                
                setRestaurants(response);
               
            }catch(error){
                console.error(error);
                
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
                  <li key={restaurant._id}> {restaurant.name} - {restaurant.address}</li>
                ))}
              </ul>
            ) : (
                <p>Nenhum restaurante encontrado.</p>
            )}
        </div>
    );
    
       
}

export default RestaurantsPage;
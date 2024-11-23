import React, { useEffect, useState } from "react";
import { getRestaurants } from "../../services/restaurantService.js";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const RestaurantCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RestaurantName = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #333;
`;

const RestaurantAddress = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
`;


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
        <Container>
        <Title>Restaurantes Próximos</Title>
        {restaurants.length > 0 ? (
          <Grid>
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant._id}>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantAddress>{restaurant.address}</RestaurantAddress>
              </RestaurantCard>
            ))}
          </Grid>
        ) : (
          <p>Nenhum restaurante encontrado.</p>
        )}
      </Container>
    );
    
       
}

export default RestaurantsPage;
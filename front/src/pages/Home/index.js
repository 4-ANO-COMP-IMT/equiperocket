// src/components/Home.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLocation } from '../../services/locationService.js';
import OccupancyInfo from '../../components/OccupancyInfo';
import ButtonGroup from '../../components/HomeButtonGroup';
import { getNearby } from '../../services/restaurantService';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 65%);
  background-size: cover;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
`;

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchRestaurants(){
    try{
        const location = await getLocation();

        const response = await getNearby(location.latitude, location.longitude, 5000);
        console.log(response);
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
useEffect(() => {
  fetchRestaurants();
}, []);

// Função para atualizar os dados de ocupação
const updateOccupancyData = () => {
  setLoading(true);
  fetchRestaurants();
};

  return (
    <AppContainer>
      <Title>Verifique a Lotação dos Restaurantes</Title>
      <Description>Veja a ocupação em tempo real e escolha o melhor momento para sua visita.</Description>
      <ButtonGroup onUpdate={updateOccupancyData} />
      <OccupancyInfo occupancyData={restaurants} loading={loading} />
      {error && <p>Erro ao carregar os dados: {error.message}</p>}
    </AppContainer>
  );
}

export default Home;

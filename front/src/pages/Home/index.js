// src/components/Home.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getLocation } from '../../services/locationService.js';
import OccupancyInfo from '../../components/OccupancyInfo';
import ButtonGroup from '../../components/HomeButtonGroup';

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

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const location = await getLocation();
        
        if (location.userAccepted) {
          const response = await axios.get("http://localhost:6000/", {
            params: {
              lat: location.latitude,
              long: location.longitude,
              rad: 5000 // Ajuste o valor do raio conforme necessário
            }
          });
          setRestaurants(response.data);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRestaurants();
  }, []);

  return (
    <AppContainer>
      <Title>Verifique a Lotação dos Restaurantes</Title>
      <Description>Veja a ocupação em tempo real e escolha o melhor momento para sua visita.</Description>
      <ButtonGroup onUpdate={() => window.location.reload()} />
      <OccupancyInfo occupancyData={restaurants} loading={loading} />
      {error && <p>Erro ao carregar os dados: {error.message}</p>}
    </AppContainer>
  );
}

export default Home;

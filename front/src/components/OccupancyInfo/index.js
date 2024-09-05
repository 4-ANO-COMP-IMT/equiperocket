// src/components/OccupancyInfo.js

import React from 'react';
import styled from 'styled-components';

const OccupancyInfoWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const OccupancyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const OccupancyItem = styled.li`
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const OccupancyTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
`;

const OccupancyDetail = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

const OccupancyInfo = ({ occupancyData, loading }) => {
  return (
    <OccupancyInfoWrapper>
      {loading ? (
        <p>Carregando dados de ocupação...</p>
      ) : (
        <OccupancyList>
          {occupancyData.map((restaurant, index) => (
            <OccupancyItem key={index}>
              <OccupancyTitle>{restaurant.name}</OccupancyTitle>
              <OccupancyDetail>Categoria: {restaurant.category}</OccupancyDetail>
              <OccupancyDetail>Endereço: {restaurant.address}</OccupancyDetail>
              <OccupancyDetail>
                Ocupação: {restaurant.currentOccupancy} / {restaurant.maxOcupancy} pessoas
              </OccupancyDetail>
            </OccupancyItem>
          ))}
        </OccupancyList>
      )}
    </OccupancyInfoWrapper>
  );
};

export default OccupancyInfo;

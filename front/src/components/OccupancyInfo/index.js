// src/components/OccupancyInfo.js

import React from 'react';
import styled from 'styled-components';

const OccupancyInfoWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const OccupancyItem = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const OccupancyInfo = ({ occupancyData, loading }) => {
  return (
    <OccupancyInfoWrapper>
      {loading ? (
        <p>Carregando dados de ocupação...</p>
      ) : (
        occupancyData.map((restaurant, index) => (
          <OccupancyItem key={index}>
            {restaurant.name}: {restaurant.occupancy} lotado
          </OccupancyItem>
        ))
      )}
    </OccupancyInfoWrapper>
  );
};

export default OccupancyInfo;

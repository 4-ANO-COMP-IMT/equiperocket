// src/components/ButtonGroup.js

import React from 'react';
import styled from 'styled-components';

const ButtonGroupWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #002F52;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #326589;
    color: white;
  }
`;

const ButtonGroup = ({ onUpdate }) => {
  return (
    <ButtonGroupWrapper>
      <Button onClick={onUpdate}>Atualizar</Button>
    </ButtonGroupWrapper>
  );
};

export default ButtonGroup;

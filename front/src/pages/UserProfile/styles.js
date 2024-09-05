import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #171412;
  max-width: 400px;
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid #007bff;
  background-color: #e0e0e0;  /* Cor de fundo quando não há imagem */
`;


export const Title = styled.h1`
  font-size: 2rem;
  color: #dcdcdc;
  margin-bottom: 20px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: #dcdcdc;
  margin-bottom: 15px;
  text-align: center;
`;

export const Label = styled.div`
  font-size: 1.2rem;
  color: #8bf337;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Info = styled.p`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #dcdcdc;
`;

export const Error = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

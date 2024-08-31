import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  max-width: 400px;
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: black;
  margin-bottom: 10px;
`;

export const Label = styled.div`
  font-size: 1.5em;
  color: blue;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Info = styled.p`
  font-size: 1.1em;
  margin-bottom: 15px;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

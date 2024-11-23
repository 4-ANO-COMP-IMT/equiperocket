import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const Content = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #171412;
`;

export const Label = styled.label`
  font-size: 2rem;
  font-weight: bold;
  color: #dcdcdc;
  margin-bottom: 20px;
  text-align: center;
`;

export const LabelSignup = styled.label`
  font-size: 1rem;
  color: #dcdcdc;
  text-align: center;
  
  span {
    color: #8bf337; 
  }
`;

export const labelError = styled.label`
  font-size: 1.1rem;
  color: red;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #8bf337;
  }
`;

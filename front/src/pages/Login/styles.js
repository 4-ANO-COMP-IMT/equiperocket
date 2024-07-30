import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  height: 100vh;
  
`;

export const Content = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 150%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 450px;
  max-height: 400px;
  padding: 100px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 30px;
  font-weight: 600;
  color: #696969;
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
  span {
    
    color: orange; 
  }

`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;
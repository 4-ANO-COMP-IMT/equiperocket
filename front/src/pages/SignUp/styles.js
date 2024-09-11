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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 400px;
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

export const LabelLogin = styled.label`
  font-size: 1rem;
  color: #dcdcdc;
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

export const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 1rem;
    color: #dcdcdc;
  }

  input {
    width: 20px;
    height: 20px;
  }
`;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const UserProfile = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <C.Container>Loading...</C.Container>;
  }

  return (
    <C.Container>
      <C.ProfileCard>
        <C.ProfileImage src="https://via.placeholder.com/120" alt="Profile" />
        <C.Title>Profile</C.Title>
        <C.Label>Nome:</C.Label>
        <C.Info>{user.name}</C.Info>
        <C.Label>Email:</C.Label>
        <C.Info>{user.email}</C.Info>
        <C.ButtonContainer>
          <Button Text="Sair" onClick={() => { signout(); navigate("/"); }}>
            Sair
          </Button>
        </C.ButtonContainer>
      </C.ProfileCard>
    </C.Container>
  );
};

export default UserProfile;
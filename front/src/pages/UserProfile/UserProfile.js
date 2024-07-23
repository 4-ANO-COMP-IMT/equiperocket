import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const UserProfile = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Title>Profile</C.Title>
      <C.Label>Nome:</C.Label>
        <C.Info>{user.name}</C.Info>
        <C.Label>Email:</C.Label>
        <C.Info>{user.email}</C.Info>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  );
};

export default UserProfile;
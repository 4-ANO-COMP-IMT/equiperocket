import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const UserProfile = () => {
  const { signout, getProfileData } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const [profileData, fetchError] = await getProfileData();
      if (profileData) {
        setProfile(profileData);
      } else {
        setError(fetchError || "Erro ao buscar perfil");
      }
    };

    fetchProfile();
  }, [getProfileData]);

  return (
    <C.Container>
      <C.Title>Profile</C.Title>
      {error && <C.Error>{error}</C.Error>}
      {profile ? (
        <>
          <C.Label>Nome:</C.Label>
          <C.Info>{profile.name || "Nome não disponível"}</C.Info>
          <C.Label>Email:</C.Label>
          <C.Info>{profile.email || "Email não disponível"}</C.Info>
        </>
      ) : (
        <C.Info>Carregando...</C.Info>
      )}
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  );
};

export default UserProfile;

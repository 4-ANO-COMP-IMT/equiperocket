import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <C.ProfileCard>
        <C.Title>Perfil do Usuário</C.Title>
        {error && <C.Error>{error}</C.Error>}
        {profile ? (
          <>
            <C.ProfileImage
              src={profile.profileImage || "/default-profile.png"}  // Use a imagem padrão se não houver imagem do usuário
              alt="Foto de perfil"
            />
            <C.Subtitle>Informações do Perfil</C.Subtitle>
            <C.Label>Nome:</C.Label>
            <C.Info>{profile.name || "Nome não disponível"}</C.Info>
            <C.Label>Email:</C.Label>
            <C.Info>{profile.email || "Email não disponível"}</C.Info>
          </>
        ) : (
          <C.Info>Carregando...</C.Info>
        )}
        <C.ButtonContainer>
          <C.Button onClick={() => [signout(), navigate("/")]}>Sair</C.Button>
        </C.ButtonContainer>
      </C.ProfileCard>
    </C.Container>
  );
};

export default UserProfile;

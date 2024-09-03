import React, { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
      if (!email || !senha) {
          setError("Preencha todos os campos");
          return;
      }

      const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Tempo de espera esgotado. Tente novamente mais tarde.")), ms));

      try {
          const res = await Promise.race([
              signin(email, senha),
              timeout(5000) // Timeout de 5 segundos
          ]);

          if (!res) {
              setError("Erro ao fazer login. Verifique suas credenciais.");
              return;
          }

          navigate("/perfil");
          window.location.reload(); 
      } catch (err) {
          setError(err.message || "Erro ao conectar ao servidor. Tente novamente mais tarde.");
      }
  };

  return (
    <C.Container>
      <C.Label>Entre na Sua Conta</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;<span>Registre-se</span></Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Login;

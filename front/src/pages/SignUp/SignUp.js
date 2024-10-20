import React, { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;;
    if (!email || !emailConf || !senha || !nome) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    } 
    else if (!acceptTerms) {
      setError("Você deve aceitar os termos de uso para continuar");
      return;
    } else if(!emailRegex.test(email)){
      setError("Digite um e-mail válido");
      return;
    } else if (!passwordRegex.test(senha)){
      setError("A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula e um número");
      return;
    }
    
    
    const res = await signup(nome, email, senha);

    if (res) {
      setError(res);
      return;
    }
    

    alert("Usuário cadastrado com sucesso!");
    navigate("/perfil");
  };

  return (
    <C.Container>
      <C.Content>
      <C.Label>Cadastre Seus Dados</C.Label>
        <Input
          type="name"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => setEmailConf(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <C.Terms>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <span>Eu aceito os termos de uso e a política de privacidade</span>
        </C.Terms>
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelLogin>
          Já tem uma conta?
          <C.Strong>

            <Link to="/login">&nbsp;<span>Entre</span></Link>

          </C.Strong>
        </C.LabelLogin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;

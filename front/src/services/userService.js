import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});


const storeUserToken = (email, token) => {
  if (typeof window !== "undefined") {
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
     
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;
    

    if (userToken) {
      const userData = JSON.parse(userToken);
      setUser({ email: userData.email });
    }
  }, []);

  const signin = async (email, password) => {
    try{
      const res = await axios.post('http://localhost:8000/sign-in', 
        { email: email, 
          password: password 
        });
      const { token, user } = res.data;
      console.log(res);
      storeUserToken(email, token);
      console.log(localStorage.getItem("user_token"))
      setUser({ name: user.name, email });
      console.log(user)

      return null;
    }catch(error){
      return error.response ? error.response.data.message : "Erro ao fazer o login";
    }   

  };

 
  const signup = async (name, email, password) => {
    try {
      await axios.post('http://localhost:9000/sign-up', { name, email, password });
      return null; 
    } catch (error) {
   
      return error.response?.data?.message || 'Erro ao cadastrar usuário';
    }
  };
  
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  const getProfileData = async () => {
    const userToken = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;
    if (!userToken) {
      return [null, "Usuário não autenticado"];
    }
  
    const { email, token } = JSON.parse(userToken);
  
    try {
      const res = await axios.post('http://localhost:8800/profile', 
        { email, token }
      );
      const profileData = res.data;
      console.log(profileData);
      return [profileData, null];
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return [null, error.response ? error.response.data.message : "Erro na requisição"];
    }
  };
  

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout, getProfileData }}
    >
      {children}
    </AuthContext.Provider>
  );
};


 
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

const handleApiRes = async (apiCall) => {
  try {
    const res = await apiCall;
    return [res.data, null];
  } catch (error) {
    return [null, error.response ? error.response.data.message : "Erro na requisição"];
  }
};

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
      setUser({ name: user.name, email });
      
      console.log("here",user);

      return null;
    }catch(error){
      return error.response ? error.response.data.message : "Erro ao fazer o login";
    }   

  };

  const signup = async (name, email, password) => {
    const [data, error] = await handleApiRes(() =>

      axios.post('http://localhost:9000/sign-up', { name, email, password })

    );
    if (data) {
      const { token,user } = data;
      storeUserToken(email, token);
      setUser({ name: user.name, email });
    }
    return error;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


 
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
  localStorage.setItem("user_token", JSON.stringify({ email, token }));
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const userData = JSON.parse(userToken);
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === userData.email
      );

      if (hasUser?.length) {
        setUser({ name: hasUser[0].name, email: userData.email });
      }
    }
  }, []);

  const signin = async (email, password) => {
    try{
      console.log(email, password);
      const res = await axios.post('http://localhost:8000/sign-in', 
        { email: email, 
          password: password 
        });
      let { token, user } = res.data;
      console.log(res);
      localStorage.setItem("token",JSON.stringify({token,email}));
      setUser({ name: user.name, email });
      return null;
    }catch(error){
      if(error.response){
        return error.response.data.message;
      }
      return "Erro ao fazer o login";
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


 /* const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ name: hasUser[0].name, email });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (name, email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { name, email, password }];
    } else {
      newUser = [{ name, email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };*/

 
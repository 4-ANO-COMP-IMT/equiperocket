
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UserProfile from "../pages/UserProfile/UserProfile";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";

import Header from "../components/Header";
import Home from "../pages/Home";
import Restaurants from "../pages/Restaurants";


const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>

        <Header/>
        <Routes>
          <Route exact path="/restaurantes" element={<Restaurants/>} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/perfil" element={<Private Item={UserProfile} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>

    </BrowserRouter>
  );
};

export default RoutesApp;
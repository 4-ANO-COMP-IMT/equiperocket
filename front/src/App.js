import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./services/userService";
import GlobalStyle from "./styles/global";

const App = () => (
  <AuthProvider>
    <RoutesApp />
    <GlobalStyle />
  </AuthProvider>
);

export default App;
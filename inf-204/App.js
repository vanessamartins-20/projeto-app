import React from "react";
import { ThemeProvider } from "./src/contexts/TemaContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import Rotas from "./src/routes";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </ThemeProvider>
  );
}

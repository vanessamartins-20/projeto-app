import { useContext } from "react";
import { TemaContext } from "../contexts/TemaContext";

export function useTema() {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error("useTema deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
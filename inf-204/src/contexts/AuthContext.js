import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// null como padrão: assim o useAuth consegue detectar uso fora do Provider
export const AuthContext = createContext(null);

const CHAVE_USUARIO = "@pratica09:usuario";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = Visitante
  const [carregando, setCarregando] = useState(true);

  // Persistência: ao abrir o app, tenta restaurar a sessão salva
  useEffect(() => {
    async function restaurarSessao() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE_USUARIO);
        if (salvo) {
          setUsuario(JSON.parse(salvo));
        }
      } catch (erro) {
        console.warn("Erro ao restaurar sessão:", erro);
      } finally {
        setCarregando(false);
      }
    }
    restaurarSessao();
  }, []);

  async function signIn(email, senha) {
    // Aqui aconteceria uma chamada de API (axios.post)
    const respostaAPI = { id: "123", nome: "Turma INF204", email: email };
    setUsuario(respostaAPI);
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(respostaAPI));
  }

  async function signOut() {
    setUsuario(null);
    await AsyncStorage.removeItem(CHAVE_USUARIO);
  }

  return (
    <AuthContext.Provider
      value={{ logado: !!usuario, usuario, carregando, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
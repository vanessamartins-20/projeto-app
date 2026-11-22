import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTema } from "../hooks/useTema";

const Stack = createNativeStackNavigator();

// --- TELAS SIMULADAS ---
function TelaLogin() {
  const { signIn } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Área Restrita</Text>
      <Button
        title="Entrar no Sistema"
        onPress={() => signIn("teste@email.com", "123")}
      />
    </View>
  );
}

function TelaDashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, alternarTema } = useTema();

  const escuro = tema === "escuro";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: escuro ? "#121212" : "#FFFFFF",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          color: escuro ? "#FFFFFF" : "#000000",
        }}
      >
        Bem-vindo, {usuario?.nome}
      </Text>
      <Button
        title={`Tema: ${tema} (alternar)`}
        onPress={alternarTema}
      />
      <View style={{ height: 12 }} />
      <Button title="Sair da Conta" color="red" onPress={signOut} />
    </View>
  );
}

// --- ROTEADOR PRINCIPAL ---
export default function Rotas() {
  const { logado, carregando } = useAuth();

  // Enquanto lê o AsyncStorage, evita "piscar" a tela de login
  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <Stack.Screen name="Dashboard" component={TelaDashboard} />
        ) : (
          <Stack.Screen name="Login" component={TelaLogin} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
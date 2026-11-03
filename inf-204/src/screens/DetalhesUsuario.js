
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DetalhesUsuario({ route, navigation }) {
  const nomeUsuario = route.params?.nomeUsuario || "Turma INF204";

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Perfil</Text>

      <Text style={styles.texto}>
        Bem-vindo, {nomeUsuario}!
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  texto: {
    fontSize: 18,
    marginBottom: 20
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16
  }
});

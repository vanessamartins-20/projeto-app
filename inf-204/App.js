import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function App() {
  const [contagem, setContagem] = useState(0);

  const precos = [10, 15, 20, 25, 30, 35];

  let contador = 0;

  // contador = contador + 1;

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>"Ola, Turma de INF204!"</Text>

      <Text style={styles.titulo}>"Preços:"</Text>
      {precos.filter((preco) => preco > 20)
        .map((preco) => <Text style={styles.titulo}>{preco}</Text>)}

      {/* <Text style={styles.titulo}>"CONTADOR:"</Text>
      <Text style={styles.numero}>{contagem}</Text>
      <Button
        title="Incrementar +1"
        onPress={() => setContagem(contagem + 1)}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa"
  },
  texto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00695c"
  },
  titulo: {
    fontSize: 20,
    color: "#333333"
  },
  numero: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20
  }
});

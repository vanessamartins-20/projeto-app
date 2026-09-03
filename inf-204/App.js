import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Contador() {
  const [contagem, setContagem] = useState(0);

  // Incrementar +1
  function incrementar() {
    setContagem(contagem + 1);
  }

  // Decrementar -1, mas nunca fica abaixo de 0
  function decrementar() {
    setContagem(Math.max(0, contagem - 1));
  }

  // Zerar contador
  function zerar() {
    setContagem(0);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        CONTADOR
      </Text>

      <Text style={styles.numero}>
        {contagem}
      </Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={incrementar}
      >
        <Text style={styles.textoBotao}>
          Incrementar +1
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={decrementar}
      >
        <Text style={styles.textoBotao}>
          Decrementar -1
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={zerar}
      >
        <Text style={styles.textoBotao}>
          Zerar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfcfd",
    padding: 20,
  },

  titulo: {
  fontSize: 35,
  fontWeight: "bold",
  color: "#070707",
  marginBottom: 10,
  },

  numero: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#46b955",
    marginBottom: 30,
  },

  botao: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 12,
    width: 200,
    alignItems: "center",
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});




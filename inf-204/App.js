import React, { useState } from "react";
import JogoDaVelha from "./jogodavelha";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [nome1, setNome1] = useState("Joao Vitor");
  const [nome2, setNome2] = useState("Maria");
  const [nome3, setNome3] = useState("Carlos");

  const [seguindo1, setSeguindo1] = useState(false);
  const [seguindo2, setSeguindo2] = useState(false);
  const [seguindo3, setSeguindo3] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>

        {/* CARTÃO 1 */}
        <View style={styles.cartao}>

          <Image
            source={{
              uri: "https://via.placeholder.com/150",
            }}
            style={styles.avatar}
          />

          <Text style={styles.nomeUsuario}>
            {nome1}
          </Text>

          <Text style={styles.profissao}>
            Engenheiro de Software
          </Text>

          <TouchableOpacity
            style={
              seguindo1
                ? [styles.botao, styles.botaoDesativado]
                : styles.botao
            }
            activeOpacity={0.7}
            onPress={() => setSeguindo1(!seguindo1)}
          >
            <Text style={styles.textoBotao}>
              {seguindo1 ? "Já Seguindo" : "Seguir"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Alterar nome..."
            value={nome1}
            onChangeText={(texto) => setNome1(texto)}
          />

        </View>


        {/* CARTÃO 2 */}
        <View style={styles.cartao}>

          <Image
            source={{
              uri: "https://via.placeholder.com/150",
            }}
            style={styles.avatar}
          />

          <Text style={styles.nomeUsuario}>
            {nome2}
          </Text>

          <Text style={styles.profissao}>
            Desenvolvedora
          </Text>

          <TouchableOpacity
            style={
              seguindo2
                ? [styles.botao, styles.botaoDesativado]
                : styles.botao
            }
            activeOpacity={0.7}
            onPress={() => setSeguindo2(!seguindo2)}
          >
            <Text style={styles.textoBotao}>
              {seguindo2 ? "Já Seguindo" : "Seguir"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Alterar nome..."
            value={nome2}
            onChangeText={(texto) => setNome2(texto)}
          />

        </View>


        {/* CARTÃO 3 */}
        <View style={styles.cartao}>

          <Image
            source={{
              uri: "https://via.placeholder.com/150",
            }}
            style={styles.avatar}
          />

          <Text style={styles.nomeUsuario}>
            {nome3}
          </Text>

          <Text style={styles.profissao}>
            Analista de Sistemas
          </Text>

          <TouchableOpacity
            style={
              seguindo3
                ? [styles.botao, styles.botaoDesativado]
                : styles.botao
            }
            activeOpacity={0.7}
            onPress={() => setSeguindo3(!seguindo3)}
          >
            <Text style={styles.textoBotao}>
              {seguindo3 ? "Já Seguindo" : "Seguir"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Alterar nome..."
            value={nome3}
            onChangeText={(texto) => setNome3(texto)}
          />

        </View>


        {/* JOGO DA VELHA */}
        <JogoDaVelha />

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingVertical: 20,
  },

  cartao: {
    width: "85%",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  nomeUsuario: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  profissao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },

  /* Estilo aplicado quando já está seguindo */
  botaoDesativado: {
    backgroundColor: "#999999",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },

});


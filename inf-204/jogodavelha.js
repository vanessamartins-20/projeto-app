import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [jogador, setJogador] = useState("X");

  function jogar(posicao) {
    // Não permite jogar em uma célula já preenchida
    if (tabuleiro[posicao] !== "") {
      return;
    }

    const novoTabuleiro = [...tabuleiro];

    novoTabuleiro[posicao] = jogador;

    setTabuleiro(novoTabuleiro);

    // Alterna entre X e O
    setJogador(jogador === "X" ? "O" : "X");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>

      <Text style={styles.jogador}>
        Vez do jogador: {jogador}
      </Text>

      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(0)}
          >
            <Text style={styles.simbolo}>{tabuleiro[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(1)}
          >
            <Text style={styles.simbolo}>{tabuleiro[1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(2)}
          >
            <Text style={styles.simbolo}>{tabuleiro[2]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(3)}
          >
            <Text style={styles.simbolo}>{tabuleiro[3]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(4)}
          >
            <Text style={styles.simbolo}>{tabuleiro[4]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(5)}
          >
            <Text style={styles.simbolo}>{tabuleiro[5]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(6)}
          >
            <Text style={styles.simbolo}>{tabuleiro[6]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(7)}
          >
            <Text style={styles.simbolo}>{tabuleiro[7]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(8)}
          >
            <Text style={styles.simbolo}>{tabuleiro[8]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  jogador: {
    fontSize: 18,
    marginBottom: 15,
  },

  tabuleiro: {
    width: 240,
    height: 240,
  },

  linha: {
    flexDirection: "row",
  },

  celula: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },

  simbolo: {
    fontSize: 40,
    fontWeight: "bold",
  },
});


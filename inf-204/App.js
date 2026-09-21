
import React, { useState } from "react";
import { StyleSheet,Text,View,TouchableOpacity, TextInput,} from "react-native";

export default function UrnaEletronica() {
  // Estados dos candidatos
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);
  const [votosC, setVotosC] = useState(0);

  // Estado do mesário
  const [nomeMesario, setNomeMesario] = useState("");

  // Dados derivados
  const totalVotos = votosA + votosB + votosC;

  // Porcentagens
  const porcentagemA =
    totalVotos === 0 ? 0 : (votosA / totalVotos) * 100;

  const porcentagemB =
    totalVotos === 0 ? 0 : (votosB / totalVotos) * 100;

  const porcentagemC =
    totalVotos === 0 ? 0 : (votosC / totalVotos) * 100;

  // Função para zerar a urna
  const zerarUrna = () => {
    setVotosA(0);
    setVotosB(0);
    setVotosC(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel de Votação</Text>

      {/* Mesário */}
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do mesário"
        value={nomeMesario}
        onChangeText={setNomeMesario}
      />

      <Text style={styles.mesario}>
        Mesário atual: {nomeMesario}
      </Text>

      {/* Candidato A */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato A: {votosA} votos
        </Text>

        <Text style={styles.porcentagem}>
          {porcentagemA.toFixed(1)}%
        </Text>

        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosA((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em A</Text>
        </TouchableOpacity>
      </View>

      {/* Candidato B */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato B: {votosB} votos
        </Text>

        <Text style={styles.porcentagem}>
          {porcentagemB.toFixed(1)}%
        </Text>

        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosB((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em B</Text>
        </TouchableOpacity>
      </View>

      {/* Candidato C */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato C: {votosC} votos
        </Text>

        <Text style={styles.porcentagem}>
          {porcentagemC.toFixed(1)}%
        </Text>

        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosC((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em C</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View style={styles.rodape}>
        <Text style={styles.totalTexto}>
          Total de Votos: {totalVotos}
        </Text>

        <TouchableOpacity
          style={styles.botaoZerar}
          onPress={zerarUrna}
        >
          <Text style={styles.textoBotao}>Zerar Urna</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },

  input: {
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  mesario: {
    fontSize: 16,
    marginBottom: 20,
  },

  candidatoContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },

  nomeCandidato: {
    fontSize: 18,
    marginBottom: 5,
  },

  porcentagem: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },

  botaoVotar: {
    backgroundColor: "#0064A0",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  rodape: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 15,
  },

  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  botaoZerar: {
    backgroundColor: "#808080",
    padding: 15,
    borderRadius: 5,
  },
});




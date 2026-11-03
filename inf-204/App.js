
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import api from "./src/services/api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [telaFormulario, setTelaFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Buscar utilizadores na API
  const buscarDados = async (atualizacaoManual = false) => {
    if (atualizacaoManual) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const resposta = await api.get("/users");

      setUtilizadores(resposta.data);

    } catch (erro) {
      console.error("Erro ao buscar dados:", erro.message);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os utilizadores."
      );

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Executar quando a tela for aberta
  useEffect(() => {
    buscarDados();
  }, []);

  // Cadastrar utilizador usando POST
  const cadastrarUtilizador = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setEnviando(true);

    try {
      const resposta = await api.post("/users", {
        name: nome,
        email: email,
      });

      Alert.alert(
        "Sucesso",
        "Utilizador cadastrado! ID: " + resposta.data.id
      );

      setNome("");
      setEmail("");
      setTelaFormulario(false);

    } catch (erro) {
      console.error("Erro no cadastro:", erro.message);

      Alert.alert("Erro", "Não foi possível cadastrar.");

    } finally {
      setEnviando(false);
    }
  };

  // Indicador de carregamento
  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />

        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Prática 07 - Consumo de API
      </Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => setTelaFormulario(false)}
        >
          <Text style={styles.textoBotao}>
            Utilizadores
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => setTelaFormulario(true)}
        >
          <Text style={styles.textoBotao}>
            Novo cadastro
          </Text>
        </TouchableOpacity>
      </View>

      {telaFormulario ? (

        <ScrollView style={styles.formulario}>

          <Text style={styles.subtitulo}>
            Cadastrar utilizador
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.botaoEnviar}
            onPress={cadastrarUtilizador}
            disabled={enviando}
          >
            {enviando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textoBotao}>
                Enviar cadastro
              </Text>
            )}
          </TouchableOpacity>

        </ScrollView>

      ) : (

        <View style={styles.listaContainer}>

          <Text style={styles.subtitulo}>
            Lista de Utilizadores
          </Text>

          <FlatList
            data={utilizadores}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={() => buscarDados(true)}
            renderItem={({ item }) => (

              <View style={styles.cartao}>

                <Text style={styles.nome}>
                  {item.name}
                </Text>

                <Text style={styles.email}>
                  {item.email}
                </Text>

              </View>

            )}
          />

        </View>
      )}

    </View>
  );
}

// Estilização
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },

  subtitulo: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#14325A",
    padding: 12,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  listaContainer: {
    flex: 1,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    color: "#666666",
    marginTop: 5,
  },

  formulario: {
    flex: 1,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },

  botaoEnviar: {
    backgroundColor: "#14325A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

});

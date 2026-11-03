
import React, { useState, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Array inicial com 15 contatos
const contatosIniciais = [
  { id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
  { id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
  { id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
  { id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
  { id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
  { id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
  { id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
  { id: "8", nome: "Helena Martins", telefone: "(31) 92222-8888" },
  { id: "9", nome: "Igor Oliveira", telefone: "(31) 91111-9999" },
  { id: "10", nome: "Julia Santos", telefone: "(31) 90000-1111" },
  { id: "11", nome: "Lucas Ferreira", telefone: "(31) 98888-1111" },
  { id: "12", nome: "Mariana Alves", telefone: "(31) 97777-2222" },
  { id: "13", nome: "Pedro Henrique", telefone: "(31) 96666-3333" },
  { id: "14", nome: "Rafaela Gomes", telefone: "(31) 95555-4444" },
  { id: "15", nome: "Thiago Martins", telefone: "(31) 94444-5555" },
];

export default function Agenda() {

  // Estado dos contatos
  const [contatos, setContatos] = useState(contatosIniciais);

  // Estado do Pull-to-Refresh
  const [carregando, setCarregando] = useState(false);

  // Estado da rolagem infinita
  const [carregandoMais, setCarregandoMais] = useState(false);

  // Controle para evitar chamadas repetidas
  const bloqueio = useRef(false);

  // Contador para gerar IDs únicos
  const proximoId = useRef(16);

  // Função para renderizar um contato
  const renderizarContato = ({ item }) => (
    <View style={styles.cardContato}>

      <Text style={styles.nomeText}>
        {item.nome}
      </Text>

      <Text style={styles.telefoneText}>
        {item.telefone}
      </Text>

    </View>
  );

  // Função para renderizar separador
  const renderizarSeparador = () => (
    <View style={styles.separador} />
  );

  // Função para mostrar lista vazia
  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.textoVazio}>
        Agenda Vazia.
      </Text>
    </View>
  );

  // Limpar todos os contatos
  const limparAgenda = () => {
    setContatos([]);
  };

  // Desafio 1: Pull-to-Refresh
  const atualizarAgenda = () => {

    setCarregando(true);

    setTimeout(() => {

      setContatos(contatosIniciais);

      setCarregando(false);

    }, 2000);

  };

  // Desafio 2: Rolagem Infinita
  const adicionarContatos = () => {

    if (bloqueio.current || carregando || carregandoMais) {
      return;
    }

    bloqueio.current = true;
    setCarregandoMais(true);

    setTimeout(() => {

      const novosContatos = [
        {
          id: String(proximoId.current++),
          nome: "Novo Contato " + (proximoId.current - 1),
          telefone: "(31) 90000-0000",
        },
        {
          id: String(proximoId.current++),
          nome: "Novo Contato " + (proximoId.current - 1),
          telefone: "(31) 90000-0001",
        },
        {
          id: String(proximoId.current++),
          nome: "Novo Contato " + (proximoId.current - 1),
          telefone: "(31) 90000-0002",
        },
      ];

      setContatos((anteriores) => [
        ...anteriores,
        ...novosContatos,
      ]);

      setCarregandoMais(false);
      bloqueio.current = false;

    }, 1000);

  };

  return (

    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>

        <Text style={styles.titulo}>
          Minha Agenda
        </Text>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparAgenda}
        >
          <Text style={styles.textoBotao}>
            Limpar Tudo
          </Text>
        </TouchableOpacity>

      </View>

      {/* Lista de contatos */}
      <FlatList

        data={contatos}

        keyExtractor={(item) => item.id}

        renderItem={renderizarContato}

        ItemSeparatorComponent={renderizarSeparador}

        ListEmptyComponent={renderizarVazio}

        // Pull-to-Refresh
        refreshing={carregando}

        onRefresh={atualizarAgenda}

        // Rolagem infinita
        onEndReached={adicionarContatos}

        onEndReachedThreshold={0.5}

        ListFooterComponent={
          carregandoMais ? (
            <ActivityIndicator
              size="large"
              color="#14325A"
              style={styles.carregandoMais}
            />
          ) : null
        }

      />

    </View>

  );

}

// Estilização
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },

  botaoLimpar: {
    backgroundColor: "#D32F2F",
    padding: 10,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  cardContato: {
    padding: 20,
    backgroundColor: "#FFF",
  },

  nomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  telefoneText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  separador: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },

  containerVazio: {
    alignItems: "center",
    marginTop: 50,
  },

  textoVazio: {
    fontSize: 18,
    color: "#808080",
    fontStyle: "italic",
  },

  carregandoMais: {
    marginVertical: 20,
  },

});

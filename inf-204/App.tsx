

import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SQLiteProvider,
  useSQLiteContext
} from "expo-sqlite";

// Tipagem do usuário
interface Usuario {
  nome: string;
  logado: boolean;
}

// Tipagem das tarefas
interface Tarefa {
  id: number;
  descricao: string;
  concluida: number;
}

// Inicialização do banco de dados
const iniciarBanco = async (
  db: import("expo-sqlite").SQLiteDatabase
): Promise<void> => {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Base de dados inicializada!");
};

// Componente principal
export default function App() {
  return (
    <SQLiteProvider
      databaseName="app-database.db"
      onInit={iniciarBanco}
    >
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

// Tela principal
function EcraPrincipal() {
  const db = useSQLiteContext();

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "Visitante",
    logado: true
  });

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState<string>("");

  // Carrega os dados quando a tela abre
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Recupera o usuário do AsyncStorage
  const carregarPreferencias = async (): Promise<void> => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem(
        "@AppTarefas:Usuario"
      );

      if (usuarioSalvo) {
        const usuarioConvertido: Usuario = JSON.parse(usuarioSalvo);
        setUsuario(usuarioConvertido);
      }
    } catch (erro) {
      console.error("Erro ao carregar usuário:", erro);
    }
  };

  // Salva o objeto usuário no AsyncStorage
  const salvarNome = async (): Promise<void> => {
    try {
      const novoUsuario: Usuario = {
        nome: "Estudante INF204",
        logado: true
      };

      await AsyncStorage.setItem(
        "@AppTarefas:Usuario",
        JSON.stringify(novoUsuario)
      );

      setUsuario(novoUsuario);

      Alert.alert("Sucesso", "Nome atualizado!");
    } catch (erro) {
      console.error("Erro ao salvar usuário:", erro);
    }
  };

  // Consulta as tarefas no SQLite
  const carregarTarefas = async (): Promise<void> => {
    try {
      const resultados = await db.getAllAsync<Tarefa>(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );

      setTarefas(resultados);
    } catch (erro) {
      console.error("Erro ao carregar tarefas:", erro);
    }
  };

  // Adiciona uma tarefa
  const adicionarTarefa = async (): Promise<void> => {
    if (novaTarefa.trim() === "") {
      Alert.alert("Atenção", "Digite uma tarefa!");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [novaTarefa.trim(), 0]
      );

      setNovaTarefa("");

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  };

  // Alterna o status da tarefa
  const alternarStatus = async (
    id: number,
    statusAtual: number
  ): Promise<void> => {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;

      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  };

  // Exclui uma tarefa
  const excluirTarefa = async (id: number): Promise<void> => {
    try {
      await db.runAsync(
        "DELETE FROM tarefas WHERE id = ?;",
        [id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
    }
  };

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>
            Olá, {usuario.nome}!
          </Text>

          <Text style={styles.subtitulo}>
            Minhas tarefas
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
        >
          <Text style={styles.textoBotao}>
            Mudar Nome
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campo para adicionar tarefas */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhuma tarefa cadastrada.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <TouchableOpacity
              style={styles.tarefa}
              onPress={() =>
                alternarStatus(item.id, item.concluida)
              }
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida === 1 &&
                    styles.textoConcluido
                ]}
              >
                {item.concluida === 1 ? "✓ " : "○ "}
                {item.descricao}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirTarefa(item.id)}
            >
              <Text style={styles.textoExcluir}>
                X
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: 20
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A"
  },

  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginTop: 5
  },

  botaoAcao: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF"
  },

  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center"
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold"
  },

  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  tarefa: {
    flex: 1
  },

  textoTarefa: {
    fontSize: 18,
    color: "#333"
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999"
  },

  botaoExcluir: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 6,
    marginLeft: 10
  },

  textoExcluir: {
    color: "#FFF",
    fontWeight: "bold"
  },

  vazio: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 16
  }
});

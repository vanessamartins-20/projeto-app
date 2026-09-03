import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function App() {
// Criando um Array de Objetos em JavaScript puro
const tarefas = [
{ id: 1, descricao: "Estudar ES6+", concluida: true },
{ id: 2, descricao: "Configurar ambiente Expo", concluida: true },
{ id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
{ id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
];
const tarefasPendentes = tarefas.filter(
    (tarefa) => !tarefa.concluida
  );
return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Lista de Tarefas</Text>

    {tarefas.map((tarefa) => (
      <View key={tarefa.id} style={styles.card}>
        <Text style={styles.textoTarefa}>
          {tarefa.concluida ? "[OK] " : "[PENDENTE] "}
          {tarefa.descricao}
        </Text>
      </View>
    ))}

<Text style={styles.titulo}>Tarefas Pendentes</Text>

      {tarefasPendentes.map((tarefa) => (
        <View key={tarefa.id} style={styles.card}>
          <Text style={styles.textoTarefa}>
            {tarefa.descricao}
          </Text>
        </View>
      ))}
    </View>
    );
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#f5f5f5",
paddingTop: 50,
paddingHorizontal: 20,
},
titulo: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
color: "#20325a",
},
card: {
backgroundColor: "#ffffff",
padding: 15,
borderRadius: 8,
marginBottom: 10,
shadowColor: "#000",
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 2,
},
textoTarefa: {
fontSize: 16,
color: "#333",
},

});

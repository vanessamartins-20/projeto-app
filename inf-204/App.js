import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ItemTarefa from './ItemTarefa';

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: 'Estudar React Native', concluida: true },
    { id: 2, descricao: 'Fazer os exercícios de fixação', concluida: false },
    { id: 3, descricao: 'Praticar JavaScript', concluida: false }
  ]);

  const tarefasPendentes = tarefas.filter(tarefa => !tarefa.concluida);

  const adicionarTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      descricao: `Nova Tarefa ${tarefas.length + 1}`,
      concluida: false
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista Principal de Tarefas</Text>
      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />
      
      {tarefas.map(tarefa => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      <Text style={styles.subtitulo}>Tarefas Pendentes</Text>
      {tarefasPendentes.map(tarefa => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

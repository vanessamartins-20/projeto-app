import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItemTarefa({ tarefa }) {
  return (
    <View style={styles.card}>
      <Text><Text style={styles.bold}>Descrição:</Text> {tarefa.descricao}</Text>
      <Text><Text style={styles.bold}>Status:</Text> {tarefa.concluida ? 'Concluída' : 'Pendente'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
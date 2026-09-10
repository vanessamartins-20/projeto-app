import React, { useState } from 'react';
import ItemTarefa from './ItemTarefa';
import { Tarefa } from './types';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, descricao: 'Estudar React Native', concluida: true },
    { id: 2, descricao: 'Fazer os exercícios de fixação', concluida: false },
    { id: 3, descricao: 'Praticar JavaScript', concluida: false }
  ]);

  const tarefasPendentes = tarefas.filter((tarefa: Tarefa) => !tarefa.concluida);

  const adicionarTarefa = (): void => {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      descricao: `Nova Tarefa ${tarefas.length + 1}`,
      concluida: false
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista Principal de Tarefas</h1>
      <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      
      {tarefas.map(tarefa => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      <h2>Tarefas Pendentes</h2>
      {tarefasPendentes.map(tarefa => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </div>
  );
}

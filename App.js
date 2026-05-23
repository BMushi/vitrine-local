import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';

// Inicialização segura do banco de dados SQLite
const db = SQLite.openDatabaseSync('vitrinelocal.db');

// Componente: Tela de Listagem (Home) - READ e DELETE
function HomeScreen({ navigation, route }) {
  const [servicos, setServicos] = useState([]);

  // Função para buscar os registros no banco de dados
  const carregarDados = () => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS servicos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          categoria TEXT NOT NULL,
          telefone TEXT NOT NULL
        );
      `);
      const resultados = db.getAllSync('SELECT * FROM servicos;');
      setServicos(resultados);
    } catch (error) {
      console.error("Erro ao carregar dados do banco:", error);
    }
  };

  // Carrega e atualiza a tela toda vez que ela ganha foco ou sofre alterações
  useEffect(() => {
    carregarDados();
  }, [route.params?.refresh]);

  // Função para deletar um serviço (DELETE do CRUD)
  const deletarServico = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja remover este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: () => {
            try {
              db.runSync('DELETE FROM servicos WHERE id = ?;', [id]);
              carregarDados();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível deletar o registro.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prestadores do Bairro</Text>
      
      {servicos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum profissional cadastrado por perto.</Text>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardNome}>{item.nome}</Text>
                <Text style={styles.cardCategoria}>🏷️ {item.categoria}</Text>
                <Text style={styles.cardTelefone}>📞 {item.telefone}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.btnAction, styles.btnEdit]}
                  onPress={() => navigation.navigate('Formulario', { item })}
                >
                  <Text style={styles.btnActionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.btnAction, styles.btnDelete]}
                  onPress={() => deletarServico(item.id)}
                >
                  <Text style={styles.btnActionText}>Apagar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity 
        style={styles.btnFab}
        onPress={() => navigation.navigate('Formulario')}
      >
        <Text style={styles.btnFabText}>+ Novo Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

// Componente: Tela de Formulário - CREATE e UPDATE
function FormScreen({ navigation, route }) {
  const itemParaEditar = route.params?.item;
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [telefone, setTelefone] = useState('');

  // Se houver um item passado por parâmetro, preenche para edição
  useEffect(() => {
    if (itemParaEditar) {
      setNome(itemParaEditar.nome);
      setCategoria(itemParaEditar.categoria);
      setTelefone(itemParaEditar.telefone);
    }
  }, [itemParaEditar]);

  // Função para salvar as informações (CREATE e UPDATE do CRUD)
  const salvar = () => {
    if (!nome.trim() || !categoria.trim() || !telefone.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (itemParaEditar) {
        // Fluxo de Atualização (UPDATE)
        db.runSync(
          'UPDATE servicos SET nome = ?, categoria = ?, telefone = ? WHERE id = ?;',
          [nome, categoria, telefone, itemParaEditar.id]
        );
      } else {
        // Fluxo de Inserção (CREATE)
        db.runSync(
          'INSERT INTO servicos (nome, categoria, telefone) VALUES (?, ?, ?);',
          [nome, categoria, telefone]
        );
      }
      // Retorna para aHome forçando recarga
      navigation.navigate('Home', { refresh: Date.now().toString() });
    } catch (error) {
      Alert.alert("Erro", "Falha ao gravar os dados do serviço.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {itemParaEditar ? 'Atualizar Serviço' : 'Cadastrar Novo Serviço'}
      </Text>
      
      <Text style={styles.label}>Nome do Empreendedor / Negócio</Text>
      <TextInput 
        style={styles.input} 
        value={nome} 
        onChangeText={setNome} 
        placeholder="Ex: João Encanador, Maria dos Doces"
      />

      <Text style={styles.label}>Categoria do Serviço</Text>
      <TextInput 
        style={styles.input} 
        value={categoria} 
        onChangeText={setCategoria} 
        placeholder="Ex: Manutenção, Alimentação, Limpeza"
      />

      <Text style={styles.label}>Telefone de Contato (WhatsApp)</Text>
      <TextInput 
        style={styles.input} 
        value={telefone} 
        onChangeText={setTelefone} 
        placeholder="Ex: (11) 99999-8888"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
        <Text style={styles.btnSalvarText}>Salvar Registro</Text>
      </TouchableOpacity>
    </View>
  );
}

// Configuração da Navegação Base (React Navigation Stack)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: '#1e3a8a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Vitrine Local - Início' }} 
        />
        <Stack.Screen 
          name="Formulario" 
          component={FormScreen} 
          options={{ title: 'Gerenciar Serviço' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilização Centralizada (UI/UX Responsiva)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  cardCategoria: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 2,
  },
  cardTelefone: {
    fontSize: 14,
    color: '#0d9488',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
  },
  btnAction: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginLeft: 8,
  },
  btnEdit: {
    backgroundColor: '#e0f2fe',
  },
  btnDelete: {
    backgroundColor: '#fee2e2',
  },
  btnActionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#0f172a',
  },
  btnSalvar: {
    backgroundColor: '#0d9488',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  btnSalvarText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnFab: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  btnFabText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
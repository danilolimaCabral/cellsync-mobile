import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ClientesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const clientes = [
    { id: 1, nome: 'João Silva', telefone: '(11) 98765-4321', email: 'joao@email.com', compras: 5, fidelidade: 'ouro' },
    { id: 2, nome: 'Maria Santos', telefone: '(11) 97654-3210', email: 'maria@email.com', compras: 12, fidelidade: 'platina' },
    { id: 3, nome: 'Pedro Costa', telefone: '(11) 96543-2109', email: 'pedro@email.com', compras: 3, fidelidade: 'prata' },
    { id: 4, nome: 'Ana Lima', telefone: '(11) 95432-1098', email: 'ana@email.com', compras: 1, fidelidade: 'bronze' },
    { id: 5, nome: 'Carlos Souza', telefone: '(11) 94321-0987', email: 'carlos@email.com', compras: 8, fidelidade: 'ouro' },
  ];

  const getFidelidadeColor = (nivel) => {
    const colors = {
      platina: ['#e5e7eb', '#9ca3af'],
      ouro: ['#fbbf24', '#f59e0b'],
      prata: ['#d1d5db', '#9ca3af'],
      bronze: ['#d97706', '#b45309'],
    };
    return colors[nivel] || ['#6b7280', '#4b5563'];
  };

  const getFidelidadeIcon = (nivel) => {
    const icons = {
      platina: 'diamond',
      ouro: 'trophy',
      prata: 'medal',
      bronze: 'ribbon',
    };
    return icons[nivel] || 'star';
  };

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.telefone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: clientes.length,
    platina: clientes.filter(c => c.fidelidade === 'platina').length,
    ouro: clientes.filter(c => c.fidelidade === 'ouro').length,
    prata: clientes.filter(c => c.fidelidade === 'prata').length,
  };

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <Surface style={styles.searchSection} elevation={4}>
        <Searchbar
          placeholder="🔍 Buscar cliente..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#8b5cf6"
        />
      </Surface>

      {/* Cards de resumo de fidelidade */}
      <View style={styles.statsSection}>
        <Surface style={styles.statCard} elevation={3}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="people" size={24} color="#fff" />
            <Paragraph style={styles.statLabel}>Total</Paragraph>
            <Title style={styles.statValue}>{stats.total}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.statCard} elevation={3}>
          <LinearGradient
            colors={['#e5e7eb', '#9ca3af']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="diamond" size={24} color="#fff" />
            <Paragraph style={styles.statLabel}>Platina</Paragraph>
            <Title style={styles.statValue}>{stats.platina}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.statCard} elevation={3}>
          <LinearGradient
            colors={['#fbbf24', '#f59e0b']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="trophy" size={24} color="#fff" />
            <Paragraph style={styles.statLabel}>Ouro</Paragraph>
            <Title style={styles.statValue}>{stats.ouro}</Title>
          </LinearGradient>
        </Surface>
      </View>

      {/* Lista de clientes */}
      <ScrollView style={styles.clientesSection}>
        {filteredClientes.map(cliente => {
          const fidelidadeColors = getFidelidadeColor(cliente.fidelidade);
          const fidelidadeIcon = getFidelidadeIcon(cliente.fidelidade);

          return (
            <Surface key={cliente.id} style={styles.clienteCard} elevation={2}>
              <TouchableOpacity>
                <View style={styles.clienteContent}>
                  {/* Header com avatar e fidelidade */}
                  <View style={styles.clienteHeader}>
                    <LinearGradient
                      colors={['#8b5cf6', '#7c3aed']}
                      style={styles.avatar}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="person" size={28} color="#fff" />
                    </LinearGradient>
                    <View style={styles.clienteInfo}>
                      <Title style={styles.clienteNome}>{cliente.nome}</Title>
                      <View style={styles.comprasRow}>
                        <Ionicons name="cart" size={14} color="#6b7280" />
                        <Paragraph style={styles.comprasText}>
                          {cliente.compras} compras
                        </Paragraph>
                      </View>
                    </View>
                    <LinearGradient
                      colors={fidelidadeColors}
                      style={styles.fidelidadeBadge}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name={fidelidadeIcon} size={20} color="#fff" />
                    </LinearGradient>
                  </View>

                  {/* Informações de contato */}
                  <View style={styles.contatoSection}>
                    <View style={styles.contatoRow}>
                      <Ionicons name="call" size={16} color="#10b981" />
                      <Paragraph style={styles.contatoText}>{cliente.telefone}</Paragraph>
                    </View>
                    <View style={styles.contatoRow}>
                      <Ionicons name="mail" size={16} color="#3b82f6" />
                      <Paragraph style={styles.contatoText}>{cliente.email}</Paragraph>
                    </View>
                  </View>

                  {/* Badge de fidelidade */}
                  <LinearGradient
                    colors={fidelidadeColors}
                    style={styles.fidelidadeTag}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Paragraph style={styles.fidelidadeText}>
                      {cliente.fidelidade.toUpperCase()}
                    </Paragraph>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </Surface>
          );
        })}
      </ScrollView>

      {/* Botão flutuante para novo cliente */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed']}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="person-add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    color: '#fff',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  clientesSection: {
    flex: 1,
    padding: 16,
  },
  clienteCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  clienteContent: {
    padding: 16,
  },
  clienteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  comprasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  comprasText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  fidelidadeBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contatoSection: {
    gap: 8,
    marginBottom: 12,
  },
  contatoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 10,
  },
  contatoText: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
  fidelidadeTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  fidelidadeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

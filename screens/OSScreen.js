import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip, Button, SegmentedButtons, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function OSScreen() {
  const [filter, setFilter] = useState('todas');

  const ordens = [
    { id: 1, cliente: 'João Silva', aparelho: 'iPhone 13', problema: 'Tela quebrada', status: 'aberta', data: '01/12/2025', prioridade: 'alta' },
    { id: 2, cliente: 'Maria Santos', aparelho: 'Samsung S23', problema: 'Não liga', status: 'em_andamento', data: '30/11/2025', prioridade: 'urgente' },
    { id: 3, cliente: 'Pedro Costa', aparelho: 'Xiaomi Note 12', problema: 'Bateria viciada', status: 'aguardando_peca', data: '29/11/2025', prioridade: 'normal' },
    { id: 4, cliente: 'Ana Lima', aparelho: 'iPhone 12', problema: 'Câmera não funciona', status: 'concluida', data: '28/11/2025', prioridade: 'normal' },
    { id: 5, cliente: 'Carlos Souza', aparelho: 'Motorola G60', problema: 'Não carrega', status: 'aberta', data: '02/12/2025', prioridade: 'alta' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      aberta: ['#3b82f6', '#2563eb'],
      em_andamento: ['#f59e0b', '#d97706'],
      aguardando_peca: ['#8b5cf6', '#7c3aed'],
      concluida: ['#10b981', '#059669'],
      cancelada: ['#ef4444', '#dc2626'],
    };
    return colors[status] || ['#6b7280', '#4b5563'];
  };

  const getPrioridadeColor = (prioridade) => {
    const colors = {
      urgente: '#ef4444',
      alta: '#f59e0b',
      normal: '#10b981',
      baixa: '#6b7280',
    };
    return colors[prioridade] || '#6b7280';
  };

  const getStatusText = (status) => {
    const texts = {
      aberta: 'Aberta',
      em_andamento: 'Em Andamento',
      aguardando_peca: 'Aguardando Peça',
      concluida: 'Concluída',
      cancelada: 'Cancelada',
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      aberta: 'document-text',
      em_andamento: 'construct',
      aguardando_peca: 'time',
      concluida: 'checkmark-circle',
      cancelada: 'close-circle',
    };
    return icons[status] || 'document';
  };

  const filteredOrdens = ordens.filter(os => {
    if (filter === 'todas') return true;
    if (filter === 'abertas') return ['aberta', 'em_andamento', 'aguardando_peca'].includes(os.status);
    if (filter === 'concluidas') return os.status === 'concluida';
    return true;
  });

  const stats = {
    total: ordens.length,
    abertas: ordens.filter(o => ['aberta', 'em_andamento', 'aguardando_peca'].includes(o.status)).length,
    concluidas: ordens.filter(o => o.status === 'concluida').length,
  };

  return (
    <View style={styles.container}>
      {/* Cards de resumo */}
      <View style={styles.statsSection}>
        <Surface style={styles.statCard} elevation={3}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="document-text" size={24} color="#fff" />
            <Paragraph style={styles.statLabel}>Total</Paragraph>
            <Title style={styles.statValue}>{stats.total}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.statCard} elevation={3}>
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="construct" size={24} color="#fff" />
            <Paragraph style={styles.statLabel}>Abertas</Paragraph>
            <Title style={styles.statValue}>{stats.abertas}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.statCard} elevation={3}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Paragraph style={styles.statLabel}>Concluídas</Paragraph>
            <Title style={styles.statValue}>{stats.concluidas}</Title>
          </LinearGradient>
        </Surface>
      </View>

      {/* Filtros */}
      <View style={styles.filterSection}>
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          buttons={[
            { value: 'todas', label: 'Todas', icon: 'format-list-bulleted' },
            { value: 'abertas', label: 'Abertas', icon: 'clock-outline' },
            { value: 'concluidas', label: 'Concluídas', icon: 'check-circle-outline' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {/* Lista de OS */}
      <ScrollView style={styles.ordensSection}>
        {filteredOrdens.map(os => {
          const statusColors = getStatusColor(os.status);
          const statusIcon = getStatusIcon(os.status);
          const prioridadeColor = getPrioridadeColor(os.prioridade);

          return (
            <Surface key={os.id} style={styles.osCard} elevation={2}>
              <TouchableOpacity>
                <View style={styles.osContent}>
                  {/* Header com status */}
                  <View style={styles.osHeader}>
                    <View style={styles.osHeaderLeft}>
                      <LinearGradient
                        colors={statusColors}
                        style={styles.statusIcon}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Ionicons name={statusIcon} size={20} color="#fff" />
                      </LinearGradient>
                      <View>
                        <Title style={styles.osId}>OS #{os.id}</Title>
                        <Paragraph style={styles.osData}>{os.data}</Paragraph>
                      </View>
                    </View>
                    <View style={[styles.prioridadeBadge, { backgroundColor: prioridadeColor }]}>
                      <Paragraph style={styles.prioridadeText}>
                        {os.prioridade.toUpperCase()}
                      </Paragraph>
                    </View>
                  </View>

                  {/* Informações do cliente */}
                  <View style={styles.osInfo}>
                    <View style={styles.infoRow}>
                      <Ionicons name="person" size={16} color="#6b7280" />
                      <Paragraph style={styles.infoLabel}>Cliente:</Paragraph>
                      <Paragraph style={styles.infoValue}>{os.cliente}</Paragraph>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="phone-portrait" size={16} color="#6b7280" />
                      <Paragraph style={styles.infoLabel}>Aparelho:</Paragraph>
                      <Paragraph style={styles.infoValue}>{os.aparelho}</Paragraph>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="alert-circle" size={16} color="#6b7280" />
                      <Paragraph style={styles.infoLabel}>Problema:</Paragraph>
                      <Paragraph style={styles.infoValue}>{os.problema}</Paragraph>
                    </View>
                  </View>

                  {/* Status badge */}
                  <LinearGradient
                    colors={statusColors}
                    style={styles.statusBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Paragraph style={styles.statusText}>
                      {getStatusText(os.status)}
                    </Paragraph>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </Surface>
          );
        })}
      </ScrollView>

      {/* Botão flutuante para nova OS */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed']}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="add" size={28} color="#fff" />
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
  filterSection: {
    padding: 16,
    paddingTop: 0,
  },
  segmentedButtons: {
    backgroundColor: '#fff',
  },
  ordensSection: {
    flex: 1,
    padding: 16,
  },
  osCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  osContent: {
    padding: 16,
  },
  osHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  osHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  osId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  osData: {
    fontSize: 12,
    color: '#6b7280',
  },
  prioridadeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  prioridadeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  osInfo: {
    gap: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
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

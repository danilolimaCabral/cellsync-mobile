import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, SegmentedButtons, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function FinanceiroScreen() {
  const [filter, setFilter] = useState('todos');

  const lancamentos = [
    { id: 1, tipo: 'receita', descricao: 'Venda iPhone 13', valor: 6999.00, data: '02/12/2025', categoria: 'Vendas' },
    { id: 2, tipo: 'despesa', descricao: 'Aluguel da loja', valor: 3500.00, data: '01/12/2025', categoria: 'Fixas' },
    { id: 3, tipo: 'receita', descricao: 'Reparo Samsung S23', valor: 450.00, data: '01/12/2025', categoria: 'Serviços' },
    { id: 4, tipo: 'despesa', descricao: 'Compra de estoque', valor: 15000.00, data: '30/11/2025', categoria: 'Compras' },
    { id: 5, tipo: 'receita', descricao: 'Venda de acessórios', valor: 189.50, data: '02/12/2025', categoria: 'Vendas' },
  ];

  const receitas = lancamentos.filter(l => l.tipo === 'receita').reduce((sum, l) => sum + l.valor, 0);
  const despesas = lancamentos.filter(l => l.tipo === 'despesa').reduce((sum, l) => sum + l.valor, 0);
  const saldo = receitas - despesas;

  const filteredLancamentos = lancamentos.filter(l => {
    if (filter === 'todos') return true;
    return l.tipo === filter;
  });

  return (
    <View style={styles.container}>
      {/* Cards de resumo financeiro */}
      <View style={styles.resumoSection}>
        <Surface style={styles.resumoCard} elevation={4}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.resumoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.resumoHeader}>
              <Ionicons name="trending-up" size={32} color="#fff" />
              <Paragraph style={styles.resumoLabel}>Receitas</Paragraph>
            </View>
            <Title style={styles.resumoValue}>R$ {receitas.toFixed(2)}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.resumoCard} elevation={4}>
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.resumoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.resumoHeader}>
              <Ionicons name="trending-down" size={32} color="#fff" />
              <Paragraph style={styles.resumoLabel}>Despesas</Paragraph>
            </View>
            <Title style={styles.resumoValue}>R$ {despesas.toFixed(2)}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.saldoCard} elevation={4}>
          <LinearGradient
            colors={saldo >= 0 ? ['#8b5cf6', '#7c3aed'] : ['#f59e0b', '#d97706']}
            style={styles.saldoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.saldoHeader}>
              <Ionicons name="wallet" size={36} color="#fff" />
              <Paragraph style={styles.saldoLabel}>Saldo do Período</Paragraph>
            </View>
            <Title style={styles.saldoValue}>
              R$ {saldo.toFixed(2)}
            </Title>
            <Paragraph style={styles.saldoSubtext}>
              {saldo >= 0 ? '✓ Positivo' : '⚠ Atenção'}
            </Paragraph>
          </LinearGradient>
        </Surface>
      </View>

      {/* Filtros */}
      <View style={styles.filterSection}>
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          buttons={[
            { value: 'todos', label: 'Todos', icon: 'format-list-bulleted' },
            { value: 'receita', label: 'Receitas', icon: 'arrow-up-circle' },
            { value: 'despesa', label: 'Despesas', icon: 'arrow-down-circle' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {/* Lista de lançamentos */}
      <ScrollView style={styles.lancamentosSection}>
        <Title style={styles.sectionTitle}>📊 Lançamentos</Title>
        {filteredLancamentos.map(lancamento => {
          const isReceita = lancamento.tipo === 'receita';
          const gradientColors = isReceita 
            ? ['#d1fae5', '#a7f3d0'] 
            : ['#fee2e2', '#fecaca'];
          const iconColor = isReceita ? '#10b981' : '#ef4444';
          const icon = isReceita ? 'arrow-up-circle' : 'arrow-down-circle';

          return (
            <Surface key={lancamento.id} style={styles.lancamentoCard} elevation={2}>
              <TouchableOpacity>
                <LinearGradient
                  colors={gradientColors}
                  style={styles.lancamentoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.lancamentoContent}>
                    <View style={styles.lancamentoLeft}>
                      <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
                        <Ionicons name={icon} size={24} color="#fff" />
                      </View>
                      <View style={styles.lancamentoInfo}>
                        <Title style={styles.lancamentoDescricao}>
                          {lancamento.descricao}
                        </Title>
                        <View style={styles.lancamentoMeta}>
                          <Ionicons name="pricetag" size={12} color="#6b7280" />
                          <Paragraph style={styles.categoria}>
                            {lancamento.categoria}
                          </Paragraph>
                          <Paragraph style={styles.data}> • {lancamento.data}</Paragraph>
                        </View>
                      </View>
                    </View>
                    <View style={styles.valorContainer}>
                      <Title style={[styles.valor, { color: iconColor }]}>
                        {isReceita ? '+' : '-'} R$ {lancamento.valor.toFixed(2)}
                      </Title>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Surface>
          );
        })}
      </ScrollView>

      {/* Botão flutuante para novo lançamento */}
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
  resumoSection: {
    padding: 16,
    gap: 12,
  },
  resumoCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  resumoGradient: {
    padding: 16,
  },
  resumoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  resumoLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resumoValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  saldoCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  saldoGradient: {
    padding: 20,
    alignItems: 'center',
  },
  saldoHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  saldoLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  saldoValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  saldoSubtext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  filterSection: {
    padding: 16,
    paddingTop: 0,
  },
  segmentedButtons: {
    backgroundColor: '#fff',
  },
  lancamentosSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  lancamentoCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  lancamentoGradient: {
    padding: 16,
  },
  lancamentoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lancamentoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lancamentoInfo: {
    flex: 1,
  },
  lancamentoDescricao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  lancamentoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoria: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  data: {
    fontSize: 12,
    color: '#9ca3af',
  },
  valorContainer: {
    alignItems: 'flex-end',
  },
  valor: {
    fontSize: 18,
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

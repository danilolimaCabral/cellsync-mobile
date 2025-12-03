import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function EstoqueScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const produtos = [
    { id: 1, nome: 'iPhone 13 Pro', quantidade: 5, minimo: 3, imei: '123456789012345' },
    { id: 2, nome: 'Samsung Galaxy S23', quantidade: 8, minimo: 5, imei: '234567890123456' },
    { id: 3, nome: 'Xiaomi Redmi Note 12', quantidade: 12, minimo: 10, imei: '345678901234567' },
    { id: 4, nome: 'Capinha Transparente', quantidade: 50, minimo: 20, imei: null },
    { id: 5, nome: 'Película de Vidro', quantidade: 80, minimo: 30, imei: null },
    { id: 6, nome: 'Fone Bluetooth', quantidade: 2, minimo: 5, imei: '456789012345678' },
  ];

  const filteredProdutos = produtos.filter(p =>
    p.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (quantidade, minimo) => {
    if (quantidade === 0) return ['#ef4444', '#dc2626'];
    if (quantidade <= minimo) return ['#f59e0b', '#d97706'];
    return ['#10b981', '#059669'];
  };

  const getStatusText = (quantidade, minimo) => {
    if (quantidade === 0) return 'Esgotado';
    if (quantidade <= minimo) return 'Baixo';
    return 'OK';
  };

  const getStatusIcon = (quantidade, minimo) => {
    if (quantidade === 0) return 'close-circle';
    if (quantidade <= minimo) return 'alert-circle';
    return 'checkmark-circle';
  };

  const totalProdutos = produtos.length;
  const estoqueBaixo = produtos.filter(p => p.quantidade <= p.minimo && p.quantidade > 0).length;
  const esgotados = produtos.filter(p => p.quantidade === 0).length;

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <Surface style={styles.searchSection} elevation={4}>
        <Searchbar
          placeholder="🔍 Buscar produto ou IMEI..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#8b5cf6"
        />
      </Surface>

      {/* Cards de resumo com gradientes */}
      <View style={styles.summary}>
        <Surface style={styles.summaryCard} elevation={3}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="cube" size={28} color="#fff" />
            <Paragraph style={styles.summaryLabel}>Total</Paragraph>
            <Title style={styles.summaryValue}>{totalProdutos}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.summaryCard} elevation={3}>
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="alert-circle" size={28} color="#fff" />
            <Paragraph style={styles.summaryLabel}>Baixo</Paragraph>
            <Title style={styles.summaryValue}>{estoqueBaixo}</Title>
          </LinearGradient>
        </Surface>

        <Surface style={styles.summaryCard} elevation={3}>
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.summaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="close-circle" size={28} color="#fff" />
            <Paragraph style={styles.summaryLabel}>Esgotado</Paragraph>
            <Title style={styles.summaryValue}>{esgotados}</Title>
          </LinearGradient>
        </Surface>
      </View>

      {/* Lista de produtos */}
      <ScrollView style={styles.productsSection}>
        {filteredProdutos.map(produto => {
          const statusColors = getStatusColor(produto.quantidade, produto.minimo);
          const statusText = getStatusText(produto.quantidade, produto.minimo);
          const statusIcon = getStatusIcon(produto.quantidade, produto.minimo);

          return (
            <Surface key={produto.id} style={styles.productCard} elevation={2}>
              <View style={styles.productContent}>
                <View style={styles.productHeader}>
                  <View style={styles.productTitleRow}>
                    <Title style={styles.productName}>{produto.nome}</Title>
                    <LinearGradient
                      colors={statusColors}
                      style={styles.statusBadge}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name={statusIcon} size={16} color="#fff" />
                      <Paragraph style={styles.statusText}>{statusText}</Paragraph>
                    </LinearGradient>
                  </View>
                </View>

                <View style={styles.productDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Ionicons name="layers-outline" size={18} color="#6b7280" />
                      <Paragraph style={styles.detailLabel}>Quantidade:</Paragraph>
                      <Paragraph style={styles.detailValue}>{produto.quantidade}</Paragraph>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="stats-chart-outline" size={18} color="#6b7280" />
                      <Paragraph style={styles.detailLabel}>Mínimo:</Paragraph>
                      <Paragraph style={styles.detailValue}>{produto.minimo}</Paragraph>
                    </View>
                  </View>

                  {produto.imei && (
                    <View style={styles.imeiRow}>
                      <Ionicons name="barcode-outline" size={18} color="#8b5cf6" />
                      <Paragraph style={styles.imeiLabel}>IMEI:</Paragraph>
                      <Paragraph style={styles.imeiValue}>{produto.imei}</Paragraph>
                    </View>
                  )}
                </View>
              </View>
            </Surface>
          );
        })}
      </ScrollView>
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
  summary: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  summaryValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  productsSection: {
    flex: 1,
    padding: 16,
  },
  productCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  productContent: {
    padding: 16,
  },
  productHeader: {
    marginBottom: 12,
  },
  productTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  imeiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  imeiLabel: {
    fontSize: 13,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  imeiValue: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
});

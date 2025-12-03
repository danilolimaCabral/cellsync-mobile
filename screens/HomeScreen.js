import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const stats = [
    { 
      title: 'Vendas Hoje', 
      value: 'R$ 2.450,00', 
      icon: 'trending-up',
      gradient: ['#10b981', '#059669'],
      bgGradient: ['#d1fae5', '#a7f3d0']
    },
    { 
      title: 'OS Abertas', 
      value: '12', 
      icon: 'construct',
      gradient: ['#f59e0b', '#d97706'],
      bgGradient: ['#fef3c7', '#fde68a']
    },
    { 
      title: 'Produtos', 
      value: '248', 
      icon: 'cube',
      gradient: ['#8b5cf6', '#7c3aed'],
      bgGradient: ['#ede9fe', '#ddd6fe']
    },
    { 
      title: 'Clientes', 
      value: '156', 
      icon: 'people',
      gradient: ['#ec4899', '#db2777'],
      bgGradient: ['#fce7f3', '#fbcfe8']
    },
  ];

  const quickActions = [
    {
      title: 'Nova Venda',
      icon: 'cart',
      gradient: ['#10b981', '#059669'],
      screen: 'PDV'
    },
    {
      title: 'Nova OS',
      icon: 'construct',
      gradient: ['#f59e0b', '#d97706'],
      screen: 'OS'
    },
    {
      title: 'Novo Cliente',
      icon: 'person-add',
      gradient: ['#8b5cf6', '#7c3aed'],
      screen: 'Clientes'
    },
    {
      title: 'Ver Estoque',
      icon: 'cube',
      gradient: ['#ec4899', '#db2777'],
      screen: 'Estoque'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header com gradiente */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Title style={styles.headerTitle}>✨ CellSync Mobile</Title>
        <Paragraph style={styles.headerSubtitle}>
          Sistema de Gestão Profissional
        </Paragraph>
      </LinearGradient>

      {/* Cards de estatísticas com gradiente */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Surface key={index} style={styles.statCard} elevation={3}>
            <LinearGradient
              colors={stat.bgGradient}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statCardContent}>
                <View style={styles.statIconContainer}>
                  <LinearGradient
                    colors={stat.gradient}
                    style={styles.statIcon}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name={stat.icon} size={24} color="#fff" />
                  </LinearGradient>
                </View>
                <View style={styles.statTextContainer}>
                  <Paragraph style={styles.statLabel}>{stat.title}</Paragraph>
                  <Title style={styles.statValue}>{stat.value}</Title>
                </View>
              </View>
            </LinearGradient>
          </Surface>
        ))}
      </View>

      {/* Ações rápidas com botões modernos */}
      <View style={styles.quickActionsSection}>
        <Title style={styles.sectionTitle}>🚀 Ações Rápidas</Title>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Surface key={index} style={styles.actionCard} elevation={2}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate(action.screen)}
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
                labelStyle={styles.actionButtonLabel}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={action.icon} size={28} color="#fff" />
                  <Paragraph style={styles.actionButtonText}>
                    {action.title}
                  </Paragraph>
                </LinearGradient>
              </Button>
            </Surface>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    color: '#e9d5ff',
    fontSize: 15,
    fontWeight: '500',
  },
  statsGrid: {
    padding: 16,
    marginTop: -20,
  },
  statCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 16,
    borderRadius: 16,
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    marginRight: 16,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statTextContainer: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  quickActionsSection: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButtonContent: {
    height: 120,
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  actionButtonLabel: {
    margin: 0,
    padding: 0,
  },
});

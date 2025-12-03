import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const stats = [
    { label: 'Vendas Hoje', value: 'R$ 2.450', icon: 'trending-up', colors: ['#10b981', '#059669'] },
    { label: 'OS Abertas', value: '12', icon: 'construct', colors: ['#f59e0b', '#d97706'] },
    { label: 'Produtos', value: '248', icon: 'cube', colors: ['#8b5cf6', '#7c3aed'] },
    { label: 'Clientes', value: '156', icon: 'people', colors: ['#ec4899', '#db2777'] },
  ];

  const quickActions = [
    { label: 'Nova Venda', icon: 'cart', colors: ['#10b981', '#059669'], screen: 'PDV' },
    { label: 'Nova OS', icon: 'construct', colors: ['#f59e0b', '#d97706'], screen: 'OS' },
    { label: 'Novo Cliente', icon: 'person-add', colors: ['#8b5cf6', '#7c3aed'], screen: 'Clientes' },
    { label: 'Ver Estoque', icon: 'cube', colors: ['#ec4899', '#db2777'], screen: 'Estoque' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Stats Grid - 2x2 compacto */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Surface key={index} style={styles.statCard} elevation={2}>
            <LinearGradient
              colors={stat.colors}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={stat.icon} size={24} color="#fff" />
              <Paragraph style={styles.statLabel}>{stat.label}</Paragraph>
              <Title style={styles.statValue}>{stat.value}</Title>
            </LinearGradient>
          </Surface>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>⚡ Ações Rápidas</Title>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.actionButton}
              onPress={() => navigation?.navigate(action.screen)}
            >
              <LinearGradient
                colors={action.colors}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={action.icon} size={22} color="#fff" />
                <Paragraph style={styles.actionLabel}>{action.label}</Paragraph>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Atividades Recentes */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>📋 Atividades Recentes</Title>
        
        <Surface style={styles.activityCard} elevation={1}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#10b981' }]}>
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
            </View>
            <View style={styles.activityInfo}>
              <Paragraph style={styles.activityTitle}>Venda finalizada</Paragraph>
              <Paragraph style={styles.activityTime}>Há 5 minutos</Paragraph>
            </View>
            <Paragraph style={styles.activityValue}>R$ 6.999</Paragraph>
          </View>
        </Surface>

        <Surface style={styles.activityCard} elevation={1}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#f59e0b' }]}>
              <Ionicons name="construct" size={18} color="#fff" />
            </View>
            <View style={styles.activityInfo}>
              <Paragraph style={styles.activityTitle}>Nova OS criada</Paragraph>
              <Paragraph style={styles.activityTime}>Há 15 minutos</Paragraph>
            </View>
            <Paragraph style={styles.activityValue}>#1234</Paragraph>
          </View>
        </Surface>

        <Surface style={styles.activityCard} elevation={1}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#8b5cf6' }]}>
              <Ionicons name="person-add" size={18} color="#fff" />
            </View>
            <View style={styles.activityInfo}>
              <Paragraph style={styles.activityTitle}>Cliente cadastrado</Paragraph>
              <Paragraph style={styles.activityTime}>Há 1 hora</Paragraph>
            </View>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 10,
  },
  statCard: {
    width: '48%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 14,
    alignItems: 'center',
    minHeight: 110,
    justifyContent: 'center',
  },
  statLabel: {
    color: '#fff',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
    opacity: 0.95,
    fontWeight: '500',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  section: {
    padding: 14,
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 14,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  activityCard: {
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#9ca3af',
  },
  activityValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10b981',
  },
});

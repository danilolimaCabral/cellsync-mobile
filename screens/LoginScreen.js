import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button, Title, Paragraph, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    // Simulação de login (substitua por chamada real à API)
    setTimeout(async () => {
      try {
        // Salvar token de autenticação
        await AsyncStorage.setItem('userToken', 'fake-token-123');
        await AsyncStorage.setItem('userName', email.split('@')[0]);
        
        setLoading(false);
        onLogin();
      } catch (error) {
        setLoading(false);
        alert('Erro ao fazer login');
      }
    }, 1500);
  };

  return (
    <LinearGradient
      colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo e Título */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#ffffff', '#f3f4f6']}
                style={styles.logo}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="phone-portrait" size={48} color="#8b5cf6" />
              </LinearGradient>
            </View>
            <Title style={styles.title}>CellSync</Title>
            <Paragraph style={styles.subtitle}>
              Sistema de Gestão para Lojas de Celular
            </Paragraph>
          </View>

          {/* Card de Login */}
          <Surface style={styles.loginCard} elevation={8}>
            <Title style={styles.loginTitle}>Bem-vindo!</Title>
            <Paragraph style={styles.loginSubtitle}>
              Faça login para continuar
            </Paragraph>

            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
              style={styles.input}
              outlineColor="#e5e7eb"
              activeOutlineColor="#8b5cf6"
            />

            <TextInput
              label="Senha"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
              outlineColor="#e5e7eb"
              activeOutlineColor="#8b5cf6"
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.loginButtonContent}
              labelStyle={styles.loginButtonLabel}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <Button
              mode="text"
              onPress={() => alert('Funcionalidade em desenvolvimento')}
              style={styles.forgotButton}
              labelStyle={styles.forgotButtonLabel}
            >
              Esqueceu a senha?
            </Button>
          </Surface>

          {/* Rodapé */}
          <View style={styles.footer}>
            <Paragraph style={styles.footerText}>
              © 2024 CellSync. Todos os direitos reservados.
            </Paragraph>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#e9d5ff',
    textAlign: 'center',
  },
  loginCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#fff',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotButton: {
    marginTop: 4,
  },
  forgotButtonLabel: {
    color: '#8b5cf6',
    fontSize: 14,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#e9d5ff',
    textAlign: 'center',
  },
});

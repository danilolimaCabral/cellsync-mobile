import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

// Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PDVScreen from './screens/PDVScreen';
import EstoqueScreen from './screens/EstoqueScreen';
import OSScreen from './screens/OSScreen';
import ClientesScreen from './screens/ClientesScreen';
import FinanceiroScreen from './screens/FinanceiroScreen';

const Tab = createBottomTabNavigator();

// Tema personalizado moderno
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#8B5CF6',
    secondary: '#EC4899',
    tertiary: '#3B82F6',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    onSurface: '#1F2937',
    onSurfaceVariant: '#6B7280',
  },
};

function AppNavigator({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PDV') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Estoque') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'OS') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Clientes') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Financeiro') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#8B5CF6',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerShadowVisible: false,
        headerRight: () => (
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#FFFFFF"
            style={{ marginRight: 16 }}
            onPress={onLogout}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen 
        name="PDV" 
        component={PDVScreen}
        options={{
          title: 'Ponto de Venda',
          tabBarLabel: 'PDV',
        }}
      />
      <Tab.Screen 
        name="Estoque" 
        component={EstoqueScreen}
        options={{
          title: 'Controle de Estoque',
          tabBarLabel: 'Estoque',
        }}
      />
      <Tab.Screen 
        name="OS" 
        component={OSScreen}
        options={{
          title: 'Ordens de Serviço',
          tabBarLabel: 'OS',
        }}
      />
      <Tab.Screen 
        name="Clientes" 
        component={ClientesScreen}
        options={{
          title: 'Gestão de Clientes',
          tabBarLabel: 'Clientes',
        }}
      />
      <Tab.Screen 
        name="Financeiro" 
        component={FinanceiroScreen}
        options={{
          title: 'Financeiro',
          tabBarLabel: 'Finanças',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8B5CF6' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {isAuthenticated ? (
            <AppNavigator onLogout={handleLogout} />
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )}
        </NavigationContainer>
        <StatusBar style="light" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL do backend CellSync
const API_URL = 'https://3000-iob7ye059hwvp4sz9bjn9-f9914a8d.manusvm.computer/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido, fazer logout
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
    }
    return Promise.reject(error);
  }
);

// ========== AUTENTICAÇÃO ==========
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// ========== DASHBOARD ==========
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  
  getRecentActivities: async () => {
    const response = await api.get('/dashboard/activities');
    return response.data;
  },
};

// ========== PRODUTOS ==========
export const produtosAPI = {
  getAll: async () => {
    const response = await api.get('/produtos');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },
  
  search: async (query) => {
    const response = await api.get('/produtos/search', { params: { q: query } });
    return response.data;
  },
};

// ========== VENDAS ==========
export const vendasAPI = {
  create: async (venda) => {
    const response = await api.post('/vendas', venda);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/vendas');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/vendas/${id}`);
    return response.data;
  },
};

// ========== ORDENS DE SERVIÇO ==========
export const osAPI = {
  getAll: async () => {
    const response = await api.get('/os');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/os/${id}`);
    return response.data;
  },
  
  create: async (os) => {
    const response = await api.post('/os', os);
    return response.data;
  },
  
  update: async (id, os) => {
    const response = await api.put(`/os/${id}`, os);
    return response.data;
  },
};

// ========== CLIENTES ==========
export const clientesAPI = {
  getAll: async () => {
    const response = await api.get('/clientes');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },
  
  create: async (cliente) => {
    const response = await api.post('/clientes', cliente);
    return response.data;
  },
  
  update: async (id, cliente) => {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  },
};

// ========== FINANCEIRO ==========
export const financeiroAPI = {
  getSummary: async () => {
    const response = await api.get('/financeiro/summary');
    return response.data;
  },
  
  getLancamentos: async (filters) => {
    const response = await api.get('/financeiro/lancamentos', { params: filters });
    return response.data;
  },
  
  createLancamento: async (lancamento) => {
    const response = await api.post('/financeiro/lancamentos', lancamento);
    return response.data;
  },
};

// ========== ESTOQUE ==========
export const estoqueAPI = {
  getAll: async () => {
    const response = await api.get('/estoque');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/estoque/${id}`);
    return response.data;
  },
  
  getSummary: async () => {
    const response = await api.get('/estoque/summary');
    return response.data;
  },
};

export default api;

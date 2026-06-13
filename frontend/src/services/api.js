import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Injeta token JWT em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────────────
export const login = (data) => api.post('/api/auth/login', data);
export const cadastro = (data) => api.post('/api/auth/cadastro', data);
export const getMe = () => api.get('/api/auth/me');

// ── Eventos ──────────────────────────────────────────────────
export const listarEventos = () => api.get('/api/eventos');
export const criarEvento = (data) => api.post('/api/eventos', data);

// ── Participantes ─────────────────────────────────────────────
export const criarParticipante = (data) => api.post('/api/participantes', data);

// ── Participações ─────────────────────────────────────────────
export const registrarParticipacao = (data) => api.post('/api/participacoes', data);

// ── Questionários ─────────────────────────────────────────────
export const submeterQuestionario = (data) => api.post('/api/questionarios', data);

export default api;

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, cadastro as apiCadastro } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Restaura sessão do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('usuario');
    if (token && user) {
      try { setUsuario(JSON.parse(user)); } catch { limpar(); }
    }
    setCarregando(false);
  }, []);

  const limpar = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const salvar = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    setUsuario(user);
  };

  const login = useCallback(async (email, senha) => {
    const res = await apiLogin({ email, senha });
    salvar(res.data.token, res.data.usuario);
    return res.data;
  }, []);

  const cadastrar = useCallback(async (nome, email, senha) => {
    const res = await apiCadastro({ nome, email, senha });
    salvar(res.data.token, res.data.usuario);
    return res.data;
  }, []);

  const logout = useCallback(() => limpar(), []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, cadastrar, logout, autenticado: !!usuario, isAdmin: usuario?.papel === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

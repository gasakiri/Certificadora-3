import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RotaProtegida from './components/RotaProtegida';
import Sidebar from './components/Sidebar';

// Páginas públicas
import Landing from './pages/Landing';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

// Páginas do sistema (protegidas)
import Dashboard from './pages/Dashboard';
import Eventos from './pages/Eventos';
import CadastroEvento from './pages/CadastroEvento';
import Participantes from './pages/Participantes';
import Questionarios from './pages/Questionarios';
import Impacto from './pages/Impacto';
import Comparativos from './pages/Comparativos';
import Relatorios from './pages/Relatorios';
import Exportar from './pages/Exportar';

// Layout com sidebar para páginas internas
function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Protegidas — todas sob /dashboard */}
          <Route path="/dashboard" element={
            <RotaProtegida>
              <AppLayout><Dashboard /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/eventos" element={
            <RotaProtegida>
              <AppLayout><Eventos /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/eventos/novo" element={
            <RotaProtegida>
              <AppLayout><CadastroEvento /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/participantes" element={
            <RotaProtegida>
              <AppLayout><Participantes /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/questionarios" element={
            <RotaProtegida>
              <AppLayout><Questionarios /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/impacto" element={
            <RotaProtegida>
              <AppLayout><Impacto /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/comparativos" element={
            <RotaProtegida>
              <AppLayout><Comparativos /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/relatorios" element={
            <RotaProtegida>
              <AppLayout><Relatorios /></AppLayout>
            </RotaProtegida>
          } />
          <Route path="/exportar" element={
            <RotaProtegida>
              <AppLayout><Exportar /></AppLayout>
            </RotaProtegida>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, ClipboardList,
  TrendingUp, BarChart2, FileText, Download, LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  {
    section: 'Principal',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/eventos', label: 'Eventos', icon: Calendar },
      { to: '/participantes', label: 'Participantes', icon: Users },
      { to: '/questionarios', label: 'Questionários', icon: ClipboardList },
    ]
  },
  {
    section: 'Análise',
    links: [
      { to: '/impacto', label: 'Índice de Impacto', icon: TrendingUp },
      { to: '/comparativos', label: 'Comparativos', icon: BarChart2 },
    ]
  },
  {
    section: 'Saída',
    links: [
      { to: '/relatorios', label: 'Relatórios PDF', icon: FileText },
      { to: '/exportar', label: 'Exportar CSV/JSON', icon: Download },
    ]
  },
];

function iniciais(nome = '') {
  return nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'U';
}

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-avatar">IM</div>
        <div>
          <div className="brand-name">Impactômetro</div>
          <div className="brand-sub">Leia Mulheres · MD UTFPR-CP</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ section, links }) => (
          <div key={section}>
            <div className="nav-section-label">{section}</div>
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="user-avatar">{iniciais(usuario?.nome)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {usuario?.nome || 'Usuário'}
            </div>
            <div className="user-role">Administrador</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8, padding: '6px 10px',
            color: 'rgba(196,184,224,0.7)', fontSize: 12,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s', width: '100%',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(201,55,138,0.12)';
            e.currentTarget.style.color = '#e878b8';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.color = 'rgba(196,184,224,0.7)';
          }}
        >
          <LogOut size={12} /> Sair
        </button>
      </div>
    </aside>
  );
}

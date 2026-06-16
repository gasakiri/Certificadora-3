import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, BookOpen, MapPin, CalendarDays } from 'lucide-react';
import Topbar from '../components/Topbar';
import TipoBadge from '../components/TipoBadge';
import { listarEventos } from '../services/api';

const TIPOS = ['Todos', 'Roda de Conversa', 'Meninas no Lab', 'Minicurso'];

function inferirTipo(ev) {
  const n = (ev.nome || '').toLowerCase();
  if (n.includes('lab')) return 'Meninas no Lab';
  if (n.includes('minicurso')) return 'Minicurso';
  return 'Roda de Conversa';
}

export default function Eventos() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const carregar = () => {
    setLoading(true);
    listarEventos()
      .then(r => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => setEventos([]))
      .finally(() => setLoading(false));
  };

  useEffect(carregar, []);

  const filtrados = eventos.filter(ev => {
    const tipo = inferirTipo(ev);
    const matchTipo = filtroTipo === 'Todos' || tipo === filtroTipo;
    const matchBusca = !busca || ev.nome?.toLowerCase().includes(busca.toLowerCase())
      || ev.local?.toLowerCase().includes(busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  // KPIs
  const totalLivros = eventos.reduce((acc, ev) => acc + (ev.livros?.length || 0), 0);
  const autoras = new Set(
    eventos.flatMap(ev => (ev.livros || []).map(l => l.autora).filter(Boolean))
  ).size;

  return (
    <>
      <Topbar title="EVENTOS" subtitle="Gerenciamento">
        <div className="search-bar">
          <Search size={13} />
          <input
            placeholder="Buscar por nome, local, livro..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>

        <div className="filter-group">
          {TIPOS.map(t => (
            <button
              key={t}
              className={`btn btn-outline btn-pill${filtroTipo === t ? ' active' : ''}`}
              onClick={() => setFiltroTipo(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/eventos/novo')}>
          <Plus size={13} /> Cadastrar Evento
        </button>
      </Topbar>

      <div className="page-content">
        <div className="breadcrumb">Eventos</div>

        <div className="page-heading">EVENTOS REGISTRADOS</div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>{eventos.length} eventos</strong>
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>{totalLivros} livros de autoras mulheres</strong>
          </span>
        </div>

        {/* Cards de eventos */}
        {loading ? (
          <div className="loading-block"><div className="spinner" /><span>Carregando eventos...</span></div>
        ) : filtrados.length === 0 ? (
          <div className="empty-state">
            <CalendarDays size={40} />
            <p>Nenhum evento encontrado</p>
          </div>
        ) : (
          <div className="three-col" style={{ marginBottom: 24 }}>
            {filtrados.map((ev, i) => (
              <EventoCard key={ev._id || i} evento={ev} tipo={inferirTipo(ev)} featured={i === 1} />
            ))}
          </div>
        )}

        {/* KPIs bottom */}
        <div className="four-col">
          <div className="stat-card">
            <div className="stat-label">TOTAL DE EVENTOS</div>
            <div className="stat-value">{eventos.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">IIS MÉDIO GERAL</div>
            <div className="stat-value">—</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">AUTORAS REPRESENTADAS</div>
            <div className="stat-value">{autoras}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">TAXA DE PRESENÇA</div>
            <div className="stat-value">—</div>
          </div>
        </div>
      </div>
    </>
  );
}

function EventoCard({ evento, tipo, featured }) {
  return (
    <div className={`evento-card${featured ? ' featured' : ''}`}>
      <TipoBadge tipo={tipo} />
      <div className="evento-title">{evento.nome}</div>

      <div className="evento-detail-row" style={{ gap: 10 }}>
        <div>
          <div className="evento-detail-label">LOCAL</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={11} />{evento.local || '—'}
          </div>
        </div>
        <div>
          <div className="evento-detail-label">DATA</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <CalendarDays size={11} />{evento.data || '—'}
          </div>
        </div>
        <div>
          <div className="evento-detail-label">LIVROS DISCUTIDOS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
            {(evento.livros || []).length === 0
              ? <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>—</span>
              : (evento.livros || []).map((l, i) => (
                <span key={i} className="livro-tag">
                  <BookOpen size={9} />
                  {l.titulo || l}
                </span>
              ))
            }
          </div>
        </div>
        <div>
          <div className="evento-detail-label">DADOS GERAIS</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {(evento.livros || []).length} livro(s) · {(evento.livros || []).map(l => l.autora).filter(Boolean).join(', ') || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}

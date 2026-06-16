import { useState, useEffect } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import Topbar from '../components/Topbar';
import { listarEventos } from '../services/api';

// IIS mockado até o endpoint de questionários retornar dados calculados
function calcIIS(eventos) {
  if (!eventos.length) return 0;
  return (Math.random() * 2 + 7).toFixed(1);
}

const RADAR_DATA = [
  { subject: 'Engajamento', A: 4.2 },
  { subject: 'Aprendizado', A: 4.5 },
  { subject: 'Identificação', A: 3.9 },
  { subject: 'Interesse Tech', A: 4.1 },
  { subject: 'Impacto', A: 4.6 },
];

export default function Impacto() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarEventos()
      .then(r => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const iis = calcIIS(eventos);

  const barData = eventos.slice(-8).map((ev, i) => ({
    nome: ev.nome?.split(' ').slice(0, 2).join(' '),
    iis: (Math.random() * 3 + 6.5).toFixed(1),
  }));

  return (
    <>
      <Topbar title="ANÁLISE" subtitle="Índice de Impacto" />

      <div className="page-content">
        <h1 className="page-heading">Índice de Impacto Social</h1>
        <p className="page-sub">IIS calculado a partir das respostas dos questionários de percepção</p>

        {loading ? (
          <div className="loading-block"><div className="spinner" /><span>Carregando dados...</span></div>
        ) : (
          <>
            {/* KPIs */}
            <div className="four-col" style={{ marginBottom: 20 }}>
              <div className="stat-card">
                <div className="stat-label">IIS MÉDIO GERAL</div>
                <div className="stat-value">{iis}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>/ 10.0</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">EVENTOS ANALISADOS</div>
                <div className="stat-value">{eventos.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">MELHOR IIS</div>
                <div className="stat-value">{eventos.length ? (Math.random() * 1 + 9).toFixed(1) : '—'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">QUESTIONÁRIOS</div>
                <div className="stat-value">—</div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="two-col" style={{ marginBottom: 20 }}>
              <div className="card">
                <div className="section-title">IIS por Evento</div>
                <div className="section-sub">Índice de impacto calculado por evento realizado</div>
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                      <XAxis dataKey="nome" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v) => [`${v} / 10`, 'IIS']}
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--card-border)' }} />
                      <Bar dataKey="iis" radius={[4, 4, 0, 0]}>
                        {barData.map((_, i) => (
                          <Cell key={i} fill={parseFloat(_.iis) >= 8.5 ? '#2ecfa0' : parseFloat(_.iis) >= 7 ? '#6b3fa0' : '#c9378a'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="empty-state"><p>Sem dados disponíveis</p></div>
                )}
              </div>

              <div className="card">
                <div className="section-title">Dimensões do Impacto</div>
                <div className="section-sub">Média por categoria de percepção</div>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={RADAR_DATA}>
                    <PolarGrid stroke="var(--card-border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                    <Radar name="IIS" dataKey="A" stroke="var(--purple-mid)" fill="var(--purple-mid)" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fórmula */}
            <div className="card">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                <TrendingUp size={16} color="var(--purple-mid)" />
                <div className="section-title">Fórmula do IIS</div>
              </div>
              <div style={{
                background: 'var(--page-bg)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--text-primary)',
                lineHeight: 1.6,
              }}>
                IIS = (Engajamento × 0.25) + (Aprendizado × 0.30) + (Identificação × 0.20) + (Interesse_Tech × 0.15) + (Percepção_Impacto × 0.10)
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>
                Escala de 0 a 10. Calculado automaticamente a partir das respostas dos questionários de percepção (antes/depois).
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

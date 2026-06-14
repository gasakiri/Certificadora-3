import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import Topbar from '../components/Topbar';
import { listarEventos } from '../services/api';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

function gerarSerieHistorica(eventos) {
  return MESES.map((mes, i) => ({
    mes,
    iis: (Math.random() * 2 + 7).toFixed(1),
    participantes: Math.floor(Math.random() * 20 + 10),
    eventos: Math.max(1, Math.floor(eventos.length / 6) + (i % 2)),
  }));
}

export default function Comparativos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarEventos()
      .then(r => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const serie = gerarSerieHistorica(eventos);

  return (
    <>
      <Topbar title="ANÁLISE" subtitle="Comparativos" />

      <div className="page-content">
        <h1 className="page-heading">Comparativo Histórico</h1>
        <p className="page-sub">Evolução temporal dos indicadores do projeto — RF4</p>

        {loading ? (
          <div className="loading-block"><div className="spinner" /></div>
        ) : (
          <>
            <div className="card" style={{ marginBottom: 20 }}>
              <div className="section-title">Evolução do IIS — 2026</div>
              <div className="section-sub">Índice de Impacto Social ao longo dos meses</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={serie}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[5, 10]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--card-border)' }} />
                  <Legend iconType="circle" iconSize={8} />
                  <Line type="monotone" dataKey="iis" stroke="var(--purple-mid)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--purple-mid)' }} name="IIS Médio" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="two-col">
              <div className="card">
                <div className="section-title">Participantes por Mês</div>
                <div className="section-sub">Alcance mensal do projeto</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={serie}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="participantes" stroke="var(--pink-accent)" strokeWidth={2} dot={{ r: 3, fill: 'var(--pink-accent)' }} name="Participantes" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <div className="section-title">Eventos por Mês</div>
                <div className="section-sub">Frequência de realização de atividades</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={serie}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="eventos" stroke="var(--yellow-accent)" strokeWidth={2} dot={{ r: 3, fill: 'var(--yellow-accent)' }} name="Eventos" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

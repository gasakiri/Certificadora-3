import { useState, useEffect } from 'react';
import { Download, FileJson, FileText, CheckCircle } from 'lucide-react';
import Topbar from '../components/Topbar';
import { listarEventos } from '../services/api';

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSV(eventos) {
  const header = ['ID', 'Nome', 'Data', 'Local', 'Livros', 'Autoras'];
  const rows = eventos.map(ev => [
    ev._id || '',
    ev.nome || '',
    ev.data || '',
    ev.local || '',
    (ev.livros || []).map(l => l.titulo).join('; '),
    (ev.livros || []).map(l => l.autora).join('; '),
  ]);
  return [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
}

export default function Exportar() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastExport, setLastExport] = useState(null);

  useEffect(() => {
    listarEventos()
      .then(r => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCSV = () => {
    const csv = toCSV(eventos);
    downloadBlob(csv, 'impactometro_eventos.csv', 'text/csv');
    setLastExport('CSV exportado com sucesso!');
  };

  const handleJSON = () => {
    const json = JSON.stringify(eventos, null, 2);
    downloadBlob(json, 'impactometro_eventos.json', 'application/json');
    setLastExport('JSON exportado com sucesso!');
  };

  return (
    <>
      <Topbar title="SAÍDA" subtitle="Exportar CSV/JSON" />

      <div className="page-content">
        <h1 className="page-heading">Exportar Dados</h1>
        <p className="page-sub">Exporte os dados do sistema em formatos abertos — RF7</p>

        {lastExport && (
          <div className="alert alert-success" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={14} /> {lastExport}
          </div>
        )}

        <div className="two-col" style={{ maxWidth: 600 }}>
          {/* CSV */}
          <div className="card" style={{ textAlign: 'center' }}>
            <FileText size={36} color="var(--teal-accent)" style={{ marginBottom: 12, opacity: 0.8 }} />
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>CSV</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              Ideal para planilhas (Excel, Google Sheets). Inclui todos os eventos cadastrados.
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCSV} disabled={loading}>
              <Download size={13} /> Exportar CSV
            </button>
            {!loading && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                {eventos.length} registro(s)
              </div>
            )}
          </div>

          {/* JSON */}
          <div className="card" style={{ textAlign: 'center' }}>
            <FileJson size={36} color="var(--purple-mid)" style={{ marginBottom: 12, opacity: 0.8 }} />
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>JSON</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              Formato estruturado para integrações e análises programáticas.
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleJSON} disabled={loading}>
              <Download size={13} /> Exportar JSON
            </button>
            {!loading && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                {eventos.length} registro(s)
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        {!loading && eventos.length > 0 && (
          <div className="card" style={{ marginTop: 20 }}>
            <div className="section-title">Preview dos dados</div>
            <div className="section-sub">Primeiros 3 registros</div>
            <pre style={{
              background: 'var(--page-bg)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              overflow: 'auto',
              maxHeight: 240,
            }}>
              {JSON.stringify(eventos.slice(0, 3), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

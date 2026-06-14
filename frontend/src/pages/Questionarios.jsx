import { useState, useEffect } from 'react';
import { ClipboardList, Star } from 'lucide-react';
import Topbar from '../components/Topbar';
import { submeterQuestionario, listarEventos } from '../services/api';

const PERGUNTAS = [
  { key: 'interesse_tecnologia', label: 'Interesse em tecnologia e computação', tipo: 'escala' },
  { key: 'identificacao_autoras', label: 'Identificação com autoras femininas na literatura', tipo: 'escala' },
  { key: 'percepcao_impacto', label: 'Percepção do impacto social do projeto', tipo: 'escala' },
  { key: 'aprendizado', label: 'Aprendizado obtido no evento', tipo: 'escala' },
  { key: 'engajamento', label: 'Nível de engajamento durante o evento', tipo: 'escala' },
  { key: 'comentario', label: 'Comentários adicionais (opcional)', tipo: 'texto' },
];

function EscalaInput({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          style={{
            width: 36, height: 36,
            borderRadius: '50%',
            border: value === n ? '2px solid var(--purple-mid)' : '1px solid var(--card-border)',
            background: value === n ? 'var(--purple-pale)' : 'transparent',
            color: value === n ? 'var(--purple-dark)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {n}
        </button>
      ))}
      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>
        {value ? `${value}/5` : 'Não respondido'}
      </span>
    </div>
  );
}

export default function Questionarios() {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({ participante_id: '', evento_id: '' });
  const [respostas, setRespostas] = useState({});
  const [momento, setMomento] = useState('antes');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    listarEventos()
      .then(r => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});
  }, []);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const updateResp = (k, v) => setRespostas(r => ({ ...r, [k]: v }));

  const handleSubmit = async () => {
    if (!form.participante_id || !form.evento_id) {
      setFeedback({ type: 'error', msg: 'Informe o ID do participante e selecione o evento.' });
      return;
    }

    const respostasComMomento = { ...respostas, momento };

    setLoading(true);
    setFeedback(null);
    try {
      await submeterQuestionario({
        participante_id: form.participante_id,
        evento_id: form.evento_id,
        respostas: respostasComMomento,
      });
      setFeedback({ type: 'success', msg: 'Questionário registrado com sucesso! Obrigada pela participação.' });
      setRespostas({});
    } catch (e) {
      setFeedback({ type: 'error', msg: e?.response?.data?.message || 'Erro ao enviar questionário.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Topbar title="QUESTIONÁRIOS" subtitle="Coleta de Percepção" />

      <div className="page-content">
        <h1 className="page-heading">Questionário de Impacto</h1>
        <p className="page-sub">Coleta de percepção antes e depois do evento — base para o cálculo do IIS</p>

        <div style={{ display: 'flex', gap: 16 }}>
          {/* Formulário */}
          <div style={{ flex: 1, maxWidth: 620 }}>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Identificação</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">ID do Participante *</label>
                  <input
                    className="form-input"
                    placeholder="Cole o ID do participante"
                    value={form.participante_id}
                    onChange={e => update('participante_id', e.target.value)}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Evento *</label>
                  <select className="form-select" value={form.evento_id} onChange={e => update('evento_id', e.target.value)}>
                    <option value="">Selecione o evento...</option>
                    {eventos.map(ev => (
                      <option key={ev._id} value={ev._id}>{ev.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Momento da Aplicação</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['antes', 'depois'].map(m => (
                      <button
                        key={m}
                        className={`btn ${momento === m ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setMomento(m)}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {m === 'antes' ? '⬅ Antes do Evento' : 'Depois do Evento ➡'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <ClipboardList size={16} color="var(--purple-mid)" />
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  Perguntas — Momento: <span style={{ color: 'var(--purple-mid)' }}>{momento === 'antes' ? 'Antes' : 'Depois'}</span>
                </div>
              </div>

              {feedback && (
                <div className={`alert alert-${feedback.type}`} style={{ marginBottom: 16 }}>
                  {feedback.msg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {PERGUNTAS.map(({ key, label, tipo }) => (
                  <div key={key}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8 }}>
                      {label}
                    </div>
                    {tipo === 'escala' ? (
                      <EscalaInput value={respostas[key]} onChange={v => updateResp(key, v)} />
                    ) : (
                      <textarea
                        className="form-input"
                        rows={3}
                        placeholder="Escreva aqui..."
                        value={respostas[key] || ''}
                        onChange={e => updateResp(key, e.target.value)}
                        style={{ resize: 'vertical' }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="divider" />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button className="btn btn-outline" onClick={() => setRespostas({})}>Limpar</button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Enviando...</> : 'Enviar Questionário'}
                </button>
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div style={{ width: 240 }}>
            <div className="card card-sm">
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>
                Sobre a Escala
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['1', 'Muito baixo / Discordo totalmente'],
                  ['2', 'Baixo / Discordo'],
                  ['3', 'Médio / Neutro'],
                  ['4', 'Alto / Concordo'],
                  ['5', 'Muito alto / Concordo totalmente'],
                ].map(([n, desc]) => (
                  <div key={n} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: 'var(--purple-pale)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: 'var(--purple-dark)', flexShrink: 0
                    }}>{n}</div>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</span>
                  </div>
                ))}
              </div>

              <div className="divider" />

              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                As respostas são usadas para calcular o <strong style={{ color: 'var(--purple-mid)' }}>Índice de Impacto Social (IIS)</strong> do evento.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

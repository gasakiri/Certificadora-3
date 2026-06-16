import { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import Topbar from '../components/Topbar';
import { criarParticipante, registrarParticipacao, listarEventos } from '../services/api';
import { useEffect } from 'react';

const CURSOS = [
  'Engenharia de Computação',
  'Engenharia de Controle e Automação',
  'Engenharia de Software',
  'Engenharia Elétrica',
  'Engenharia Eletrônica',
  'Engenharia Mecânica',
  'Licenciatura em Matemática',
  'Tecnologia em Análise e Desenvolvimento de Sistemas',
  'Não se aplica',
  'Outro',
];

export default function Participantes() {
  const [tab, setTab] = useState('cadastro');

  const [form, setForm] = useState({ nome: '', email: '', curso: CURSOS[0] });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [partForm, setPartForm] = useState({ participante_id: '', evento_id: '' });
  const [eventos, setEventos] = useState([]);
  const [partLoading, setPartLoading] = useState(false);
  const [partFeedback, setPartFeedback] = useState(null);

  useEffect(() => {
    listarEventos()
      .then(r => setEventos(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});
  }, []);

  const update = (k, v) => setForm(f => ({
    ...f,
    [k]: v,
    ...(k === 'curso' && v !== 'Outro' ? { cursoOutro: '' } : {}),
  }));
  const updatePart = (k, v) => setPartForm(f => ({ ...f, [k]: v }));

  const handleCadastro = async () => {
    const cursoFinal = form.curso === 'Outro' ? form.cursoOutro.trim() : form.curso;
    if (!form.nome || !form.email || !cursoFinal) {
      setFeedback({ type: 'error', msg: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    const payload = {
      nome: form.nome,
      email: form.email,
      curso: cursoFinal,
    };

    setLoading(true);
    setFeedback(null);
    try {
      const res = await criarParticipante(payload);
      setFeedback({ type: 'success', msg: `Participante cadastrado! ID: ${res.data.id || '—'}` });
      setForm({ nome: '', email: '', curso: CURSOS[0], cursoOutro: '' });
    } catch (e) {
      const msg = e?.response?.data?.message || 'Erro ao cadastrar participante.';
      setFeedback({ type: e?.response?.status === 409 ? 'info' : 'error', msg });
    } finally {
      setLoading(false);
    }
  };

  const handleParticipacao = async () => {
    if (!partForm.participante_id || !partForm.evento_id) {
      setPartFeedback({ type: 'error', msg: 'Informe o ID do participante e selecione o evento.' });
      return;
    }
    setPartLoading(true);
    setPartFeedback(null);
    try {
      await registrarParticipacao(partForm);
      setPartFeedback({ type: 'success', msg: 'Participação registrada com sucesso!' });
      setPartForm({ participante_id: '', evento_id: '' });
    } catch (e) {
      setPartFeedback({ type: 'error', msg: e?.response?.data?.message || 'Erro ao registrar participação.' });
    } finally {
      setPartLoading(false);
    }
  };

  return (
    <>
      <Topbar title="PARTICIPANTES" subtitle="Gestão" />

      <div className="page-content">
        <h1 className="page-heading">Participantes</h1>
        <p className="page-sub">Cadastre participantes e registre presenças em eventos</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          <button
            className={`btn ${tab === 'cadastro' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTab('cadastro')}
          >
            <UserPlus size={13} /> Cadastrar Participante
          </button>
          <button
            className={`btn ${tab === 'participacao' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTab('participacao')}
          >
            <Users size={13} /> Registrar Participação
          </button>
        </div>

        {tab === 'cadastro' && (
          <div className="card" style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Novo Participante</div>

            {feedback && (
              <div className={`alert alert-${feedback.type}`} style={{ marginBottom: 14 }}>
                {feedback.msg}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Nome completo *</label>
                <input className="form-input" placeholder="Seu nome completo" value={form.nome} onChange={e => update('nome', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">E-mail *</label>
                <input type="email" className="form-input" placeholder="Ex: email@gmail.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Curso *</label>
                <select className="form-select" value={form.curso} onChange={e => update('curso', e.target.value)}>
                  {CURSOS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {form.curso === 'Outro' && (
                <div className="form-group">
                  <label className="form-label">Qual outro curso? *</label>
                  <input
                    className="form-input"
                    placeholder="Informe o curso"
                    value={form.cursoOutro}
                    onChange={e => update('cursoOutro', e.target.value)}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <button className="btn btn-outline" onClick={() => setForm({ nome: '', email: '', curso: CURSOS[0], cursoOutro: '' })}>Limpar</button>
                <button className="btn btn-primary" onClick={handleCadastro} disabled={loading}>
                  {loading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Salvando...</> : 'Cadastrar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'participacao' && (
          <div className="card" style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Registrar Participação em Evento</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
              Informe o ID do participante (obtido no cadastro) e selecione o evento.
            </div>

            {partFeedback && (
              <div className={`alert alert-${partFeedback.type}`} style={{ marginBottom: 14 }}>
                {partFeedback.msg}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">ID do Participante *</label>
                <input
                  className="form-input"
                  placeholder="Cole o ID retornado no cadastro"
                  value={partForm.participante_id}
                  onChange={e => updatePart('participante_id', e.target.value)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Evento *</label>
                <select
                  className="form-select"
                  value={partForm.evento_id}
                  onChange={e => updatePart('evento_id', e.target.value)}
                >
                  <option value="">Selecione um evento...</option>
                  {eventos.map(ev => (
                    <option key={ev._id} value={ev._id}>{ev.nome}</option>
                  ))}
                </select>
                {eventos.length === 0 && (
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    Nenhum evento disponível (backend pode estar offline)
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  className="btn btn-primary"
                  onClick={handleParticipacao}
                  disabled={partLoading}
                >
                  {partLoading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Registrando...</> : 'Registrar Participação'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

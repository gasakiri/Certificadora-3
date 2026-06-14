import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, BookOpen, ArrowLeft } from 'lucide-react';
import Topbar from '../components/Topbar';
import { criarEvento } from '../services/api';

const TIPOS_EVENTO = ['Roda de Conversa', 'Meninas no Lab', 'Minicurso', 'Outro'];

export default function CadastroEvento() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    data: '',
    local: '',
    tipo: 'Roda de Conversa',
  });

  const [livros, setLivros] = useState([{ titulo: '', autora: '' }]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updateLivro = (i, k, v) => {
    const novo = [...livros];
    novo[i] = { ...novo[i], [k]: v };
    setLivros(novo);
  };

  const addLivro = () => setLivros(l => [...l, { titulo: '', autora: '' }]);
  const removeLivro = (i) => setLivros(l => l.filter((_, j) => j !== i));

  const handleSubmit = async () => {
    if (!form.nome || !form.data || !form.local) {
      setFeedback({ type: 'error', msg: 'Preencha nome, data e local obrigatoriamente.' });
      return;
    }

    const livrosFiltrados = livros.filter(l => l.titulo.trim());

    setLoading(true);
    setFeedback(null);

    try {
      await criarEvento({
        nome: form.nome,
        data: form.data,
        local: form.local,
        livros: livrosFiltrados,
      });

      setFeedback({ type: 'success', msg: 'Evento cadastrado com sucesso!' });
      setTimeout(() => navigate('/eventos'), 1400);
    } catch (e) {
      const msg = e?.response?.data?.message || 'Erro ao cadastrar evento.';
      setFeedback({ type: 'error', msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Topbar title="EVENTOS" subtitle="Cadastrar Evento" />

      <div className="page-content">
        <div className="breadcrumb">
          <a onClick={() => navigate('/eventos')} style={{ cursor: 'pointer' }}>Eventos</a>
          {' > '}
          <a style={{ cursor: 'default' }}>Novo Evento</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button className="btn btn-outline" onClick={() => navigate('/eventos')}>
            <ArrowLeft size={13} /> Voltar
          </button>
          <h1 className="page-heading" style={{ marginBottom: 0 }}>Cadastro de Evento</h1>
        </div>

        {feedback && (
          <div className={`alert alert-${feedback.type === 'success' ? 'success' : 'error'}`} style={{ marginBottom: 16 }}>
            {feedback.msg}
          </div>
        )}

        <div className="card" style={{ maxWidth: 760 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>
              Dados do Evento
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Nome */}
              <div className="form-group">
                <label className="form-label">Nome do Evento *</label>
                <input
                  className="form-input"
                  placeholder="Ex: Roda de Conversa — Autoras Paranaenses"
                  value={form.nome}
                  onChange={e => update('nome', e.target.value)}
                />
              </div>

              <div className="form-grid">
                {/* Data */}
                <div className="form-group">
                  <label className="form-label">Data *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={form.data}
                    onChange={e => update('data', e.target.value)}
                  />
                </div>

                {/* Tipo */}
                <div className="form-group">
                  <label className="form-label">Tipo de Evento</label>
                  <select
                    className="form-select"
                    value={form.tipo}
                    onChange={e => update('tipo', e.target.value)}
                  >
                    {TIPOS_EVENTO.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Local */}
              <div className="form-group">
                <label className="form-label">Local *</label>
                <input
                  className="form-input"
                  placeholder="Ex: UTFPR Cornélio Procópio — Sala 204"
                  value={form.local}
                  onChange={e => update('local', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Livros */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Livros Discutidos
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  Adicione os livros e autoras abordados no evento
                </div>
              </div>
              <button className="btn btn-outline" onClick={addLivro}>
                <Plus size={12} /> Adicionar Livro
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {livros.map((livro, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">
                      <BookOpen size={10} style={{ display: 'inline', marginRight: 4 }} />
                      Título
                    </label>
                    <input
                      className="form-input"
                      placeholder="Ex: A Hora da Estrela"
                      value={livro.titulo}
                      onChange={e => updateLivro(i, 'titulo', e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Autora</label>
                    <input
                      className="form-input"
                      placeholder="Ex: Clarice Lispector"
                      value={livro.autora}
                      onChange={e => updateLivro(i, 'autora', e.target.value)}
                    />
                  </div>
                  {livros.length > 1 && (
                    <button
                      className="btn btn-outline"
                      style={{ padding: '9px 10px', marginBottom: 0 }}
                      onClick={() => removeLivro(i)}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => navigate('/eventos')}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Salvando...</> : 'Cadastrar Evento'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

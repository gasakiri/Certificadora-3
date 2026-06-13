import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

const REQUISITOS = [
  { teste: (s) => s.length >= 6, label: 'Mínimo 6 caracteres' },
  { teste: (s) => /[A-Z]/.test(s), label: 'Uma letra maiúscula' },
  { teste: (s) => /[0-9]/.test(s), label: 'Um número' },
];

export default function Cadastro() {
  const navigate = useNavigate();
  const { cadastrar } = useAuth();

  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmar: '' });
  const [verSenha, setVerSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const senhaOk = REQUISITOS.every(r => r.teste(form.senha));

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.senha) {
      setErro('Preencha todos os campos obrigatórios.'); return;
    }
    if (!senhaOk) { setErro('A senha não atende aos requisitos mínimos.'); return; }
    if (form.senha !== form.confirmar) { setErro('As senhas não coincidem.'); return; }

    setLoading(true); setErro('');
    try {
      await cadastrar(form.nome, form.email, form.senha);
      navigate('/dashboard', { replace: true });
    } catch (ex) {
      setErro(ex?.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#080614',
      display: 'flex', fontFamily: "'DM Sans', sans-serif",
      color: '#fff', overflow: 'hidden', position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes floatUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(20px,-15px); }
        }
        .auth-input {
          width: 100%; padding: 12px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #fff;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: all 0.2s;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.25); }
        .auth-input:focus {
          border-color: rgba(168,130,216,0.6);
          background: rgba(168,130,216,0.07);
          box-shadow: 0 0 0 3px rgba(168,130,216,0.12);
        }
        .auth-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #c9378a, #8b2d6e);
          border: none; border-radius: 10px;
          color: #fff; font-size: 15px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(201,55,138,0.35);
        }
        .auth-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(201,55,138,0.5);
        }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner-sm {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block; vertical-align: middle; margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Painel esquerdo — branding */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 64px',
        background: 'linear-gradient(145deg, #120a28, #0e0820)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          position: 'absolute', width: 420, height: 420,
          background: 'rgba(201,55,138,0.15)', borderRadius: '50%',
          filter: 'blur(90px)', top: -60, right: -80,
          animation: 'drift 11s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 280, height: 280,
          background: 'rgba(107,63,160,0.18)', borderRadius: '50%',
          filter: 'blur(70px)', bottom: 60, left: -40,
          animation: 'drift 15s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(168,130,216,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,130,216,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, animation: 'floatUp 0.7s ease both' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            textDecoration: 'none', color: 'inherit', marginBottom: 56,
          }}>
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(201,55,138,0.12)',
            border: '1px solid rgba(201,55,138,0.25)',
            fontSize: 11, fontWeight: 700, color: '#e878b8',
            marginBottom: 24,
          }}>♀ Faça parte do projeto</div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 48, fontWeight: 400, lineHeight: 1.1, marginBottom: 20,
          }}>
            Crie sua<br />conta agora.
          </h1>

          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 360 }}>
            Registre-se para começar a monitorar o impacto do projeto Leia Mulheres — registre eventos, colete dados e gere relatórios.
          </p>

          {/* Benefícios */}
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Dashboard com dados em tempo real',
              'Registro de eventos e participantes',
              'Cálculo automático do Índice de Impacto (IIS)',
              'Exportação em CSV e JSON',
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'rgba(61,191,160,0.2)',
                  border: '1px solid rgba(61,191,160,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={11} color="#3dbfa0" />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div style={{
        width: 520, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 48px',
        background: '#0d0b1e', overflowY: 'auto',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)',
            fontSize: 13, cursor: 'pointer', marginBottom: 48,
            padding: 0, fontFamily: 'inherit', transition: 'color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          <ArrowLeft size={14} /> Voltar ao início
        </button>

        <div style={{ animation: 'floatUp 0.6s ease 0.1s both' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Criar conta</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>
            Já tem conta?{' '}
            <Link to="/login" style={{ color: '#c9378a', fontWeight: 600, textDecoration: 'none' }}>
              Entrar
            </Link>
          </p>

          {erro && (
            <div style={{
              padding: '10px 14px', borderRadius: 10, marginBottom: 20,
              background: 'rgba(224,82,82,0.1)',
              border: '1px solid rgba(224,82,82,0.25)',
              fontSize: 13, color: '#f08080',
            }}>{erro}</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Nome */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>
                Nome completo
              </label>
              <input
                className="auth-input"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={e => update('nome', e.target.value)}
                autoFocus
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>
                E-mail
              </label>
              <input
                className="auth-input"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
              />
            </div>

            {/* Senha */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="auth-input"
                  type={verSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={e => update('senha', e.target.value)}
                  style={{ paddingRight: 44 }}
                />
                <button onClick={() => setVerSenha(v => !v)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer', padding: 0,
                }}>
                  {verSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Indicadores de requisitos */}
              {form.senha.length > 0 && (
                <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                  {REQUISITOS.map((r, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 11,
                      color: r.teste(form.senha) ? '#3dbfa0' : 'rgba(255,255,255,0.3)',
                      transition: 'color 0.2s',
                    }}>
                      <Check size={10} />
                      {r.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirmar senha */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>
                Confirmar senha
              </label>
              <input
                className="auth-input"
                type="password"
                placeholder="••••••••"
                value={form.confirmar}
                onChange={e => update('confirmar', e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{
                  borderColor: form.confirmar && form.confirmar !== form.senha
                    ? 'rgba(224,82,82,0.5)' : undefined,
                }}
              />
              {form.confirmar && form.confirmar !== form.senha && (
                <div style={{ fontSize: 11, color: '#f08080', marginTop: 4 }}>
                  As senhas não coincidem
                </div>
              )}
            </div>

            <button
              className="auth-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{ marginTop: 6 }}
            >
              {loading ? <><span className="spinner-sm" />Criando conta...</> : 'Criar conta'}
            </button>
          </div>

          <p style={{ marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.6 }}>
            Ao criar uma conta você concorda com o uso dos dados para fins<br />
            acadêmicos e de pesquisa do projeto Meninas Digitais / UTFPR-CP.
          </p>
        </div>
      </div>
    </div>
  );
}

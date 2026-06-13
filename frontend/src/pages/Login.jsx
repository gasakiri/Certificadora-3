import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const destino = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', senha: '' });
  const [verSenha, setVerSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!form.email || !form.senha) { setErro('Preencha e-mail e senha.'); return; }
    setLoading(true);
    setErro('');
    try {
      await login(form.email, form.senha);
      navigate(destino, { replace: true });
    } catch (ex) {
      setErro(ex?.response?.data?.message || 'E-mail ou senha incorretos.');
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

        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(20px,-15px); }
        }
        @keyframes floatUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
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
        {/* Orbs */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          background: 'rgba(107,63,160,0.2)', borderRadius: '50%',
          filter: 'blur(80px)', top: -100, right: -100,
          animation: 'drift 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300,
          background: 'rgba(201,55,138,0.12)', borderRadius: '50%',
          filter: 'blur(80px)', bottom: 0, left: -60,
          animation: 'drift 14s ease-in-out infinite reverse',
        }} />

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(168,130,216,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,130,216,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, animation: 'floatUp 0.7s ease both' }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            textDecoration: 'none', color: 'inherit', marginBottom: 56,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6b3fa0, #c9378a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800,
            }}>IM</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Impactômetro</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
                LEIA MULHERES · UTFPR-CP
              </div>
            </div>
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(228,180,60,0.12)',
            border: '1px solid rgba(228,180,60,0.25)',
            fontSize: 11, fontWeight: 700, color: '#f0c85a',
            marginBottom: 24,
          }}>✦ Meninas Digitais · UTFPR-CP</div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 48, fontWeight: 400, lineHeight: 1.1, marginBottom: 20,
          }}>
            Bem-vinda<br />de volta.
          </h1>

          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 360 }}>
            Acesse o painel para gerenciar eventos, registrar participações e visualizar o impacto social do projeto Leia Mulheres.
          </p>

          {/* Stats rápidos */}
          <div style={{
            marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}>
            {[
              { n: '312', l: 'Participantes' },
              { n: '24', l: 'Eventos' },
              { n: '47', l: 'Livros' },
              { n: '8.6', l: 'IIS Médio' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: i % 2 === 0 ? '#c9378a' : '#a882d8' }}>
                  {s.n}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div style={{
        width: 480, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 48px',
        background: '#0d0b1e',
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
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Entrar</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 36 }}>
            Não tem conta?{' '}
            <Link to="/cadastro" style={{ color: '#c9378a', fontWeight: 600, textDecoration: 'none' }}>
              Cadastre-se
            </Link>
          </p>

          {erro && (
            <div style={{
              padding: '10px 14px', borderRadius: 10, marginBottom: 20,
              background: 'rgba(224,82,82,0.1)',
              border: '1px solid rgba(224,82,82,0.25)',
              fontSize: 13, color: '#f08080',
            }}>
              {erro}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                autoFocus
              />
            </div>

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
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{ paddingRight: 44 }}
                />
                <button
                  onClick={() => setVerSenha(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                    cursor: 'pointer', padding: 0,
                  }}
                >
                  {verSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button className="auth-btn" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
              {loading ? <><span className="spinner-sm" />Entrando...</> : 'Entrar'}
            </button>
          </div>

          {/* Dica demo */}
          <div style={{
            marginTop: 28, padding: '12px 14px', borderRadius: 10,
            background: 'rgba(168,130,216,0.07)',
            border: '1px solid rgba(168,130,216,0.15)',
            fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
          }}>
            <strong style={{ color: '#a882d8' }}>Modo demo</strong> (sem backend):<br />
            demo@utfpr.edu.br · senha: demo123
          </div>
        </div>
      </div>
    </div>
  );
}

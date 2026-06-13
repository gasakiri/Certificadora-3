import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const STATS = [
  { valor: '312', label: 'Participantes impactadas', cor: '#c9378a' },
  { valor: '47', label: 'Livros de autoras mulheres', cor: '#a882d8' },
  { valor: '24', label: 'Eventos realizados', cor: '#e4b43c' },
  { valor: '8.6', label: 'Índice de Impacto Social médio', cor: '#3dbfa0' },
];

const PILARES = [
  {
    icone: '📚',
    titulo: 'Leitura com Propósito',
    texto: 'Rodas de conversa sobre obras de autoras mulheres que constroem identidade, pertencimento e protagonismo feminino na ciência e tecnologia.',
  },
  {
    icone: '💻',
    titulo: 'Tecnologia Inclusiva',
    texto: 'Minicursos e laboratórios práticos que conectam literatura e computação, mostrando que o espaço tecnológico também é feminino.',
  },
  {
    icone: '📊',
    titulo: 'Impacto Mensurável',
    texto: 'O Impactômetro transforma percepções subjetivas em dados concretos — evidenciando o valor social do projeto para a comunidade.',
  },
];

const EVENTOS = [
  { tipo: 'RODA DE CONVERSA', titulo: 'Autoras Paranaenses — Vozes do Sul', cor: '#c9378a' },
  { tipo: 'MENINAS NO LAB', titulo: 'Desenvolvimento de Apps com Thunkable', cor: '#a882d8' },
  { tipo: 'MINICURSO', titulo: 'Sustentabilidade e Tecnologia — O Papel das Mulheres', cor: '#e4b43c' },
  { tipo: 'RODA DE CONVERSA', titulo: 'Clarice Lispector & Carolina M. Jesus', cor: '#c9378a' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { autenticado } = useAuth();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#080614', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(201,55,138,0.4); }

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%       { transform: translate(30px, -20px) rotate(120deg); }
          66%       { transform: translate(-20px, 15px) rotate(240deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .hero-stat { animation: floatUp 0.6s ease both; }
        .hero-stat:nth-child(1) { animation-delay: 0.3s; }
        .hero-stat:nth-child(2) { animation-delay: 0.45s; }
        .hero-stat:nth-child(3) { animation-delay: 0.6s; }
        .hero-stat:nth-child(4) { animation-delay: 0.75s; }

        .pilar-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px 28px;
          transition: all 0.3s ease;
          animation: floatUp 0.6s ease both;
        }
        .pilar-card:hover {
          background: rgba(201,55,138,0.07);
          border-color: rgba(201,55,138,0.3);
          transform: translateY(-4px);
        }
        .pilar-card:nth-child(1) { animation-delay: 0.1s; }
        .pilar-card:nth-child(2) { animation-delay: 0.2s; }
        .pilar-card:nth-child(3) { animation-delay: 0.3s; }

        .evento-item {
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s;
          cursor: default;
        }
        .evento-item:hover { padding-left: 8px; }
        .evento-item:last-child { border-bottom: none; }

        .btn-hero {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 15px; font-weight: 700;
          cursor: pointer; transition: all 0.2s;
          border: none; text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-hero-primary {
          background: linear-gradient(135deg, #c9378a, #8b2d6e);
          color: #fff;
          box-shadow: 0 4px 24px rgba(201,55,138,0.4);
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,55,138,0.55);
        }
        .btn-hero-outline {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.25);
        }
        .btn-hero-outline:hover {
          border-color: rgba(168,130,216,0.7);
          background: rgba(168,130,216,0.1);
        }

        .nav-link-top {
          color: rgba(255,255,255,0.6);
          font-size: 13px; font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link-top:hover { color: #fff; }

        .gradient-text {
          background: linear-gradient(135deg, #c9378a 0%, #a882d8 50%, #e4b43c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: drift 12s ease-in-out infinite;
        }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 64,
        background: 'rgba(8,6,20,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.1 }}>Impactômetro</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              LEIA MULHERES · UTFPR-CP
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a className="nav-link-top" href="#sobre">Sobre</a>
          <a className="nav-link-top" href="#pilares">Pilares</a>
          <a className="nav-link-top" href="#eventos">Eventos</a>
          <a className="nav-link-top" href="#impacto">Impacto</a>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {autenticado ? (
            <button className="btn-hero btn-hero-primary" style={{ padding: '10px 22px', fontSize: 13 }}
              onClick={() => navigate('/dashboard')}>
              Acessar Dashboard →
            </button>
          ) : (
            <>
              <button className="btn-hero btn-hero-outline" style={{ padding: '10px 20px', fontSize: 13 }}
                onClick={() => navigate('/login')}>
                Entrar
              </button>
              <button className="btn-hero btn-hero-primary" style={{ padding: '10px 20px', fontSize: 13 }}
                onClick={() => navigate('/cadastro')}>
                Cadastrar
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 64, overflow: 'hidden' }}>
        {/* Orbs decorativos */}
        <div className="orb" style={{ width: 500, height: 500, background: 'rgba(107,63,160,0.18)', top: -100, right: -100 }} />
        <div className="orb" style={{ width: 350, height: 350, background: 'rgba(201,55,138,0.12)', bottom: 0, left: '20%', animationDelay: '-4s' }} />
        <div className="orb" style={{ width: 250, height: 250, background: 'rgba(228,180,60,0.08)', top: '40%', right: '30%', animationDelay: '-8s' }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(168,130,216,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,130,216,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '80px 48px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(201,55,138,0.12)',
            border: '1px solid rgba(201,55,138,0.25)',
            fontSize: 12, fontWeight: 600, color: '#e878b8',
            marginBottom: 28,
            animation: 'fadeIn 0.8s ease both',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#c9378a', position: 'relative',
              display: 'inline-block',
            }}>
              <span style={{
                position: 'absolute', inset: -3, borderRadius: '50%',
                border: '1.5px solid #c9378a',
                animation: 'pulse-ring 1.5s ease-out infinite',
              }} />
            </span>
            Meninas Digitais · UTFPR Cornélio Procópio
          </div>

          {/* Título principal */}
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(48px, 6vw, 88px)',
            fontWeight: 400,
            lineHeight: 1.05,
            marginBottom: 24,
            animation: 'floatUp 0.7s ease 0.1s both',
          }}>
            Medindo o impacto<br />
            de <span className="gradient-text">histórias</span><br />
            que transformam.
          </h1>

          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.55)',
            maxWidth: 520, lineHeight: 1.7, marginBottom: 40,
            fontWeight: 300,
            animation: 'floatUp 0.7s ease 0.2s both',
          }}>
            O Impactômetro Leia Mulheres quantifica o impacto social do projeto de extensão da UTFPR-CP — conectando literatura feminina, tecnologia e transformação real.
          </p>

          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            animation: 'floatUp 0.7s ease 0.3s both',
          }}>
            <button className="btn-hero btn-hero-primary"
              onClick={() => navigate(autenticado ? '/dashboard' : '/cadastro')}>
              {autenticado ? 'Acessar Dashboard' : 'Começar agora'} →
            </button>
            <button className="btn-hero btn-hero-outline"
              onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
              Saiba mais
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1, marginTop: 72,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 20, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat" style={{
                padding: '24px 20px', textAlign: 'center',
                background: 'rgba(8,6,20,0.8)',
              }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: s.cor, lineHeight: 1 }}>{s.valor}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6, fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sobre ──────────────────────────────────────────── */}
      <section id="sobre" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              color: '#a882d8', textTransform: 'uppercase', marginBottom: 16,
            }}>Sobre o projeto</div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 44, fontWeight: 400, lineHeight: 1.1, marginBottom: 24,
            }}>
              Literatura feminina<br />como ferramenta de<br />
              <em style={{ color: '#c9378a' }}>transformação social</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
              O <strong style={{ color: '#fff' }}>Leia Mulheres</strong> é uma iniciativa do projeto Meninas Digitais na UTFPR Cornélio Procópio que promove rodas de conversa, minicursos e laboratórios com foco em obras de autoras mulheres — especialmente nas áreas de ciência, tecnologia e literatura.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 15 }}>
              O Impactômetro é o sistema que registra, analisa e evidencia esse impacto — transformando percepções em dados, e dados em argumentos para a continuidade e expansão do projeto.
            </p>
          </div>

          {/* Visual decorativo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(107,63,160,0.15), rgba(201,55,138,0.1))',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: 32,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Engajamento', valor: 87, cor: '#c9378a' },
                  { label: 'Aprendizado', valor: 92, cor: '#a882d8' },
                  { label: 'Identificação com autoras', valor: 79, cor: '#e4b43c' },
                  { label: 'Interesse em tecnologia', valor: 84, cor: '#3dbfa0' },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: item.cor }}>{item.valor}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
                      <div style={{
                        height: '100%', borderRadius: 999,
                        width: `${item.valor}%`,
                        background: item.cor,
                        opacity: 0.85,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 24, padding: '16px', textAlign: 'center',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 12,
              }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: '#a882d8' }}>8.6</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  IIS Médio Geral / 10.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pilares ────────────────────────────────────────── */}
      <section id="pilares" style={{
        padding: '100px 48px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              color: '#e4b43c', textTransform: 'uppercase', marginBottom: 16,
            }}>Como atuamos</div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 44, fontWeight: 400,
            }}>
              Três pilares de impacto
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PILARES.map((p, i) => (
              <div key={i} className="pilar-card">
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icone}</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{p.titulo}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.texto}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eventos ────────────────────────────────────────── */}
      <section id="eventos" style={{ padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              color: '#c9378a', textTransform: 'uppercase', marginBottom: 16,
            }}>Atividades</div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 44, fontWeight: 400, lineHeight: 1.1, marginBottom: 24,
            }}>
              Eventos que<br />movem pessoas
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
              De rodas de conversa íntimas a laboratórios de tecnologia, cada evento é registrado, analisado e contribui para o índice de impacto do projeto.
            </p>
            <button className="btn-hero btn-hero-outline"
              onClick={() => navigate(autenticado ? '/eventos' : '/login')}
              style={{ fontSize: 13 }}>
              Ver todos os eventos →
            </button>
          </div>

          <div>
            {EVENTOS.map((ev, i) => (
              <div key={i} className="evento-item">
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  color: ev.cor, marginBottom: 4,
                }}>{ev.tipo}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                  {ev.titulo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section id="impacto" style={{
        padding: '100px 48px',
        background: 'linear-gradient(135deg, rgba(107,63,160,0.15) 0%, rgba(201,55,138,0.1) 50%, rgba(228,180,60,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 52, fontWeight: 400, lineHeight: 1.1, marginBottom: 24,
          }}>
            Acesse o painel<br />
            <span className="gradient-text">completo de dados</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
            Cadastre-se para acessar o dashboard, registrar eventos, coletar questionários e visualizar o índice de impacto social em tempo real.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            {autenticado ? (
              <button className="btn-hero btn-hero-primary" onClick={() => navigate('/dashboard')}>
                Ir para o Dashboard →
              </button>
            ) : (
              <>
                <button className="btn-hero btn-hero-primary" onClick={() => navigate('/cadastro')}>
                  Criar conta gratuita →
                </button>
                <button className="btn-hero btn-hero-outline" onClick={() => navigate('/login')}>
                  Já tenho conta
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer style={{
        padding: '40px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{ fontSize: 18, fontWeight: 600 }}>
            Impactômetro Leia Mulheres
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
             © 2026 Meninas Digitais. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

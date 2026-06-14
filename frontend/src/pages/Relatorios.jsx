import Topbar from '../components/Topbar';
import { FileText, Info } from 'lucide-react';

export default function Relatorios() {
  return (
    <>
      <Topbar title="SAÍDA" subtitle="Relatórios PDF" />
      <div className="page-content">
        <h1 className="page-heading">Relatórios PDF</h1>
        <p className="page-sub">Geração de relatórios consolidados — RF6 (responsabilidade: Kalvin)</p>

        <div className="card" style={{ maxWidth: 480, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <Info size={20} color="var(--purple-mid)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Módulo em desenvolvimento</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              A geração de relatórios em PDF está sendo implementada pelo membro Kalvin (Dashboards e Relatórios).
              Esta tela será integrada ao módulo de exportação quando o endpoint <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--page-bg)', padding: '1px 4px', borderRadius: 3 }}>/api/relatorios</code> estiver disponível.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

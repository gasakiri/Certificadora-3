export default function Topbar({ title, subtitle, actions, children }) {
  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="topbar-title">
          {title}{subtitle && <span> · {subtitle}</span>}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'flex-end' }}>
        {children}
        {actions}
        <div className="topbar-logo">
          <span className="logo-meninas">MENINAS</span>
          <span className="logo-digitais">DIGITAIS</span>
          <span className="logo-sub">UTFPR-CP</span>
        </div>
      </div>
    </div>
  );
}

const tipoMap = {
  'Roda de Conversa': 'roda',
  'Lab': 'lab',
  'Meninas no Lab': 'lab',
  'Minicurso': 'minicurso',
};

export default function TipoBadge({ tipo }) {
  const key = tipoMap[tipo] || 'outro';
  return <span className={`badge badge-${key}`}>{tipo || 'Evento'}</span>;
}

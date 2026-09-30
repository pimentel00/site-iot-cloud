export default function MetricCard({ title, value, unit, icon: Icon, color, previousValue }) {
  const delta = previousValue != null && value != null ? value - previousValue : null;
  const deltaFormatted = delta != null ? Math.abs(delta).toFixed(1) : null;

  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
      style={{ borderLeftWidth: '4px', borderLeftColor: color }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{value != null ? Number(value).toFixed(1) : '--'}</span>
            <span className="text-lg text-gray-400">{unit}</span>
          </div>
          {delta != null && (
            <p className={`text-xs mt-2 flex items-center gap-1 ${delta >= 0 ? 'text-red-400' : 'text-green-400'}`}>
              {delta >= 0 ? '▲' : '▼'} {deltaFormatted}{unit}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {Icon && <Icon className="w-6 h-6" style={{ color }} />}
        </div>
      </div>
    </div>
  );
}

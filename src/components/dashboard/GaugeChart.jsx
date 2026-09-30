import { useMemo } from 'react';

export default function GaugeChart({ value, min, max, title, unit, color, thresholds }) {
  const percentage = useMemo(() => {
    if (value == null) return 0;
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  }, [value, min, max]);

  const activeColor = useMemo(() => {
    if (!thresholds || thresholds.length === 0) return color;
    for (let i = 0; i < thresholds.length; i++) {
      if (value <= thresholds[i].value) return thresholds[i].color;
    }
    return thresholds[thresholds.length - 1].color;
  }, [value, thresholds, color]);

  // Arc math
  const radius = 70;
  const cx = 100;
  const cy = 90;
  const startAngle = Math.PI; // left
  const endAngle = 0; // right
  const totalAngle = Math.PI;
  const valueAngle = startAngle - percentage * totalAngle;

  const arcPath = (startA, endA, r) => {
    const x1 = cx + r * Math.cos(startA);
    const y1 = cy - r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy - r * Math.sin(endA);
    const largeArc = Math.abs(startA - endA) > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-white/[0.07] transition-colors">
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
        {/* Background arc */}
        <path
          d={arcPath(startAngle, endAngle, radius)}
          fill="none"
          stroke="#1e293b"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Value arc */}
        {percentage > 0 && (
          <path
            d={arcPath(startAngle, valueAngle, radius)}
            fill="none"
            stroke={activeColor}
            strokeWidth="14"
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}
        {/* Value text */}
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-white text-2xl font-bold" style={{ fontSize: '24px', fontWeight: 700 }}>
          {value != null ? Math.round(value * 10) / 10 : '--'}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-gray-400" style={{ fontSize: '12px' }}>
          {unit}
        </text>
      </svg>
      <p className="text-sm text-gray-400 mt-2">{title}</p>
    </div>
  );
}

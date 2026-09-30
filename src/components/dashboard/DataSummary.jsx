export default function DataSummary({ stats }) {
  if (!stats) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
        <p className="text-gray-500">Sem dados disponíveis</p>
      </div>
    );
  }

  const metrics = [
    { emoji: '🌡️', label: 'Temperatura', data: stats.temperatura, unit: '°C' },
    { emoji: '💧', label: 'Umidade', data: stats.umidade, unit: '%' },
    { emoji: '🌿', label: 'Qualidade do Ar', data: stats.poluicao_ar, unit: '%' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">📊 Resumo Estatístico</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 text-gray-500 font-medium">Métrica</th>
              <th className="text-right py-2 text-gray-500 font-medium">Mínimo</th>
              <th className="text-right py-2 text-gray-500 font-medium">Máximo</th>
              <th className="text-right py-2 text-gray-500 font-medium">Média</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="py-3 text-gray-300">
                  {m.emoji} {m.label}
                </td>
                <td className="py-3 text-right text-cyan-400 font-mono">
                  {m.data.min.toFixed(1)}{m.unit}
                </td>
                <td className="py-3 text-right text-orange-400 font-mono">
                  {m.data.max.toFixed(1)}{m.unit}
                </td>
                <td className="py-3 text-right text-lime-400 font-mono font-semibold">
                  {m.data.avg.toFixed(1)}{m.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

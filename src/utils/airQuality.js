export function classifyAirQuality(value) {
  if (value <= 25) return { label: 'Bom', color: '#22c55e', bgColor: 'bg-green-500/20', textColor: 'text-green-400', emoji: '🟢' };
  if (value <= 50) return { label: 'Moderado', color: '#eab308', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400', emoji: '🟡' };
  if (value <= 75) return { label: 'Ruim', color: '#f97316', bgColor: 'bg-orange-500/20', textColor: 'text-orange-400', emoji: '🟠' };
  return { label: 'Péssimo', color: '#ef4444', bgColor: 'bg-red-500/20', textColor: 'text-red-400', emoji: '🔴' };
}

export function getAirQualityDescription(value) {
  if (value <= 25) return 'Qualidade do ar boa. Ideal para atividades ao ar livre.';
  if (value <= 50) return 'Qualidade do ar aceitável. Pessoas sensíveis podem sentir desconforto.';
  if (value <= 75) return 'Qualidade do ar ruim. Evite atividades prolongadas ao ar livre.';
  return 'Qualidade do ar crítica. Evite exposição ao ar livre.';
}

const timeFormatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit', month: '2-digit', year: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
});

export function formatTemperature(value) {
  return value != null ? `${Number(value).toFixed(1)}°C` : '--°C';
}

export function formatHumidity(value) {
  return value != null ? `${Number(value).toFixed(1)}%` : '--%';
}

export function formatAirQuality(value) {
  return value != null ? `${Math.round(value)}%` : '--%';
}

export function formatTime(timestamp) {
  if (!timestamp) return '--:--';
  return timeFormatter.format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  if (!timestamp) return '--';
  return dateTimeFormatter.format(new Date(timestamp));
}

export function formatRelativeTime(timestamp) {
  if (!timestamp) return 'sem dados';
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 5) return 'agora mesmo';
  if (diff < 60) return `há ${diff} segundos`;
  if (diff < 3600) return `há ${Math.floor(diff / 60)} minutos`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} horas`;
  return `há ${Math.floor(diff / 86400)} dias`;
}

export function exportToCSV(data, filename = 'rioclima-dados') {
  if (!data || data.length === 0) return;
  const header = 'Data/Hora,Temperatura (°C),Umidade (%),Poluição do Ar (%)';
  const rows = data.map(d =>
    `${formatDateTime(d.timestamp)},${Number(d.temperatura).toFixed(1)},${Number(d.umidade).toFixed(1)},${Math.round(d.poluicao_ar)}`
  );
  const csv = [header, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function generateDemoData() {
  const now = Date.now();
  const data = [];
  const baseTemp = 30;
  const baseHumidity = 62;
  const baseAir = 38;

  for (let i = 99; i >= 0; i--) {
    const timestamp = now - i * 5 * 60 * 1000; // every 5 min, last ~8h
    const hour = new Date(timestamp).getHours();

    // Temperature: warmer midday (peaks around 13h), cooler at night
    const hourFactor = Math.sin(((hour - 6) / 12) * Math.PI);
    const temp = baseTemp + hourFactor * 4 + (Math.random() - 0.5) * 1.5;

    // Humidity: inversely correlated with temp
    const hum = baseHumidity - hourFactor * 12 + (Math.random() - 0.5) * 5;

    // Air quality: slightly worse in rush hours
    const rushFactor = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 8 : 0;
    const air = baseAir + rushFactor + (Math.random() - 0.5) * 6;

    data.push({
      id: `demo-${i}`,
      temperatura: Math.round(temp * 10) / 10,
      umidade: Math.max(30, Math.min(95, Math.round(hum * 10) / 10)),
      poluicao_ar: Math.max(0, Math.min(100, Math.round(air))),
      timestamp,
    });
  }
  return data;
}

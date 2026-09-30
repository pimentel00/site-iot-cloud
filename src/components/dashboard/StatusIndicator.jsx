import { useState, useEffect } from 'react';
import { formatRelativeTime } from '../../utils/formatters';

export default function StatusIndicator({ lastUpdate, isDemo }) {
  const [, forceUpdate] = useState(0);

  // Update relative time every second
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (isDemo) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
        <span className="text-sm">🧪</span>
        <span className="text-xs text-purple-300 font-medium">Modo Demo</span>
      </div>
    );
  }

  const getStatus = () => {
    if (!lastUpdate) return { color: 'gray', label: 'Sem dados', ping: false };
    const diff = (Date.now() - lastUpdate.getTime()) / 1000;
    if (diff < 30) return { color: 'green', label: 'Sensor online', ping: true };
    if (diff < 300) return { color: 'yellow', label: 'Sensor com atraso', ping: false };
    return { color: 'red', label: 'Sensor offline', ping: false };
  };

  const status = getStatus();
  const dotColors = {
    green: 'bg-green-400',
    yellow: 'bg-yellow-400',
    red: 'bg-red-400',
    gray: 'bg-gray-500',
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {status.ping && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColors[status.color]} opacity-75`} />
          )}
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColors[status.color]}`} />
        </span>
        <span className="text-xs text-gray-400">{status.label}</span>
      </div>
      {lastUpdate && (
        <span className="text-xs text-gray-500">
          Última leitura: {formatRelativeTime(lastUpdate.getTime())}
        </span>
      )}
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Thermometer, Droplets, Wind, Settings, Download, Database } from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import MetricCard from '../components/dashboard/MetricCard';
import GaugeChart from '../components/dashboard/GaugeChart';
import TimeSeriesChart from '../components/dashboard/TimeSeriesChart';
import StatusIndicator from '../components/dashboard/StatusIndicator';
import DataSummary from '../components/dashboard/DataSummary';
import FirebaseConfigPanel from '../components/config/FirebaseConfigPanel';

import useFirebaseConfig from '../hooks/useFirebaseConfig';
import useFirebaseData from '../hooks/useFirebaseData';
import { exportToCSV, generateDemoData } from '../utils/formatters';
import { classifyAirQuality } from '../utils/airQuality';

export default function DashboardPage() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const firebaseConfig = useFirebaseConfig();
  const { config, isConfigured, isDemo } = firebaseConfig;

  // Real Firebase data
  const dataPath = isDemo ? null : config?.dataPath;
  const firebaseData = useFirebaseData(dataPath, 100);

  // Demo data
  const demoData = useMemo(() => isDemo ? generateDemoData() : [], [isDemo]);

  // Select data source
  const data = isDemo ? demoData : firebaseData.data;
  const currentData = isDemo
    ? (demoData.length > 0 ? demoData[demoData.length - 1] : null)
    : firebaseData.currentData;
  const previousData = isDemo
    ? (demoData.length > 1 ? demoData[demoData.length - 2] : null)
    : firebaseData.previousData;
  const stats = isDemo
    ? calcStats(demoData)
    : firebaseData.stats;
  const lastUpdate = isDemo ? new Date() : firebaseData.lastUpdate;
  const isLoading = isDemo ? false : firebaseData.isLoading;

  const airQuality = currentData ? classifyAirQuality(currentData.poluicao_ar) : null;

  // Not configured state
  if (!isConfigured) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <Database className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Configure sua conexão</h2>
            <p className="text-gray-400 mb-8">
              Configure sua conexão com o Firebase para visualizar os dados dos sensores em tempo real.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsConfigOpen(true)}
                className="w-full py-3 rounded-full bg-lime-400 text-navy-900 font-semibold hover:bg-lime-500 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" /> Configurar Firebase
              </button>
              <button
                onClick={() => firebaseConfig.saveConfig({ dataPath: '__demo__' })}
                className="w-full py-3 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium hover:bg-purple-500/20 transition-colors"
              >
                🧪 Ou use o modo demo
              </button>
            </div>
          </div>
        </div>
        <FirebaseConfigPanel
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          firebaseConfig={firebaseConfig}
        />
      </>
    );
  }

  // Loading state
  if (isLoading && !isDemo) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-lime-400/30 border-t-lime-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Carregando dados...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Dashboard <span className="text-lime-400">RioClima</span>
            </h1>
            <StatusIndicator lastUpdate={lastUpdate} isDemo={isDemo} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportToCSV(data)}
              disabled={data.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" /> Exportar CSV
            </button>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4" /> Configurar
            </button>
          </div>
        </div>

        {/* Air Quality Banner */}
        {airQuality && (
          <div className={`mb-6 p-4 rounded-2xl border ${airQuality.bgColor} border-white/10 flex items-center gap-3`}>
            <span className="text-2xl">{airQuality.emoji}</span>
            <div>
              <p className={`text-sm font-semibold ${airQuality.textColor}`}>
                Qualidade do Ar: {airQuality.label} ({currentData.poluicao_ar}%)
              </p>
              <p className="text-xs text-gray-400">
                {currentData.poluicao_ar <= 25 && 'Qualidade do ar boa. Ideal para atividades ao ar livre.'}
                {currentData.poluicao_ar > 25 && currentData.poluicao_ar <= 50 && 'Qualidade do ar aceitável. Pessoas sensíveis podem sentir desconforto.'}
                {currentData.poluicao_ar > 50 && currentData.poluicao_ar <= 75 && 'Qualidade do ar ruim. Evite atividades prolongadas ao ar livre.'}
                {currentData.poluicao_ar > 75 && 'Qualidade do ar crítica. Evite exposição ao ar livre.'}
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Row 1: Metric Cards */}
          <MetricCard
            title="Temperatura"
            value={currentData?.temperatura}
            unit="°C"
            icon={Thermometer}
            color="#f97316"
            previousValue={previousData?.temperatura}
          />
          <MetricCard
            title="Umidade"
            value={currentData?.umidade}
            unit="%"
            icon={Droplets}
            color="#06b6d4"
            previousValue={previousData?.umidade}
          />
          <MetricCard
            title="Poluição do Ar"
            value={currentData?.poluicao_ar}
            unit="%"
            icon={Wind}
            color="#22c55e"
            previousValue={previousData?.poluicao_ar}
          />

          {/* Row 2: Temperature Chart + Gauge */}
          <div className="md:col-span-2">
            <TimeSeriesChart
              data={data}
              dataKey="temperatura"
              title="🌡️ Temperatura (°C)"
              unit="°C"
              color="#f97316"
            />
          </div>
          <GaugeChart
            value={currentData?.temperatura}
            min={15}
            max={50}
            title="Temperatura"
            unit="°C"
            color="#f97316"
          />

          {/* Row 3: Humidity Chart + Gauge */}
          <div className="md:col-span-2">
            <TimeSeriesChart
              data={data}
              dataKey="umidade"
              title="💧 Umidade do Ar (%)"
              unit="%"
              color="#06b6d4"
            />
          </div>
          <GaugeChart
            value={currentData?.umidade}
            min={0}
            max={100}
            title="Umidade"
            unit="%"
            color="#06b6d4"
          />

          {/* Row 4: Air Quality Chart + Gauge */}
          <div className="md:col-span-2">
            <TimeSeriesChart
              data={data}
              dataKey="poluicao_ar"
              title="🌿 Qualidade do Ar (%)"
              unit="%"
              color="#22c55e"
            />
          </div>
          <GaugeChart
            value={currentData?.poluicao_ar}
            min={0}
            max={100}
            title="Qualidade do Ar"
            unit="%"
            color="#22c55e"
            thresholds={[
              { value: 25, color: '#22c55e' },
              { value: 50, color: '#eab308' },
              { value: 75, color: '#f97316' },
              { value: 100, color: '#ef4444' },
            ]}
          />

          {/* Row 5: Data Summary */}
          <div className="md:col-span-2 lg:col-span-3">
            <DataSummary stats={stats} />
          </div>
        </div>
      </div>

      <FirebaseConfigPanel
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        firebaseConfig={firebaseConfig}
      />
    </>
  );
}

// Helper to calculate stats from demo data
function calcStats(data) {
  if (!data || data.length === 0) return null;
  const calc = (key) => {
    const values = data.map(d => d[key]).filter(v => v != null);
    if (values.length === 0) return { min: 0, max: 0, avg: 0 };
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
    };
  };
  return {
    temperatura: calc('temperatura'),
    umidade: calc('umidade'),
    poluicao_ar: calc('poluicao_ar'),
  };
}

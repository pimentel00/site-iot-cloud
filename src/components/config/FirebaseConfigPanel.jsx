import { useState, useEffect } from 'react';
import { Settings, X, Loader2, Wifi, WifiOff, Play } from 'lucide-react';

export default function FirebaseConfigPanel({ isOpen, onClose, firebaseConfig }) {
  const { config, isConnected, isConnecting, error, saveConfig, clearConfig, testConnection } = firebaseConfig;

  const [form, setForm] = useState({
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    dataPath: 'leituras',
  });

  useEffect(() => {
    if (config) {
      setForm({
        apiKey: config.apiKey || '',
        authDomain: config.authDomain || '',
        databaseURL: config.databaseURL || '',
        projectId: config.projectId || '',
        dataPath: config.dataPath || 'leituras',
      });
    }
  }, [config]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    saveConfig(form);
  };

  const handleDemo = () => {
    saveConfig({ dataPath: '__demo__' });
    onClose();
  };

  const inputClass = 'w-full bg-navy-800 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/30 transition-colors placeholder-gray-600';

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Panel */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-navy-900 border-l border-white/10 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-lime-400" />
              <h2 className="text-lg font-bold">Configuração do Firebase</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">API Key</label>
              <input
                type="text"
                value={form.apiKey}
                onChange={handleChange('apiKey')}
                placeholder="AIzaSy..."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Auth Domain</label>
              <input
                type="text"
                value={form.authDomain}
                onChange={handleChange('authDomain')}
                placeholder="seu-projeto.firebaseapp.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Database URL</label>
              <input
                type="text"
                value={form.databaseURL}
                onChange={handleChange('databaseURL')}
                placeholder="https://seu-projeto-default-rtdb.firebaseio.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Project ID</label>
              <input
                type="text"
                value={form.projectId}
                onChange={handleChange('projectId')}
                placeholder="seu-projeto-id"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Caminho dos Dados</label>
              <input
                type="text"
                value={form.dataPath}
                onChange={handleChange('dataPath')}
                placeholder="leituras"
                className={inputClass}
              />
              <p className="text-xs text-gray-600 mt-1">
                Caminho no Realtime Database onde os dados estão armazenados
              </p>
            </div>
          </div>

          {/* Status messages */}
          {isConnected && !error && config?.dataPath !== '__demo__' && (
            <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-xs text-green-400 flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5" />
                Conexão estabelecida com sucesso!
              </p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-red-400 flex items-center gap-2">
                <WifiOff className="w-3.5 h-3.5" />
                {error}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={testConnection}
              disabled={isConnecting}
              className="w-full py-2.5 rounded-lg border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isConnecting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Testando...</>
              ) : (
                <><Wifi className="w-4 h-4" /> Testar Conexão</>
              )}
            </button>
            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-lg bg-lime-400 text-navy-900 text-sm font-semibold hover:bg-lime-500 transition-colors"
            >
              Salvar Configuração
            </button>
          </div>

          {/* Separator */}
          <div className="my-6 border-t border-white/5" />

          {/* Demo mode */}
          <button
            onClick={handleDemo}
            className="w-full py-2.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-sm font-medium text-purple-300 hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Usar dados demonstrativos (sem Firebase)
          </button>

          {/* Clear config */}
          {config && (
            <button
              onClick={clearConfig}
              className="w-full mt-3 text-xs text-gray-600 hover:text-red-400 transition-colors"
            >
              Limpar Configuração
            </button>
          )}
        </div>
      </div>
    </>
  );
}

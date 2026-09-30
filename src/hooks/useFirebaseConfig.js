import { useState, useEffect, useCallback } from 'react';
import { initFirebase, testConnection as fbTestConnection } from '../services/firebase';

const STORAGE_KEY = 'rioclima-firebase-config';

export default function useFirebaseConfig() {
  const [config, setConfig] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
        if (parsed.dataPath !== '__demo__') {
          initFirebase({
            apiKey: parsed.apiKey,
            authDomain: parsed.authDomain,
            databaseURL: parsed.databaseURL,
            projectId: parsed.projectId,
          });
          setIsConnected(true);
        }
      }
    } catch (e) {
      console.error('Error loading Firebase config:', e);
    }
  }, []);

  const saveConfig = useCallback((newConfig) => {
    try {
      setConfig(newConfig);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setError(null);

      if (newConfig.dataPath !== '__demo__') {
        initFirebase({
          apiKey: newConfig.apiKey,
          authDomain: newConfig.authDomain,
          databaseURL: newConfig.databaseURL,
          projectId: newConfig.projectId,
        });
        setIsConnected(true);
      } else {
        setIsConnected(true);
      }
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const clearConfig = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(null);
    setIsConnected(false);
    setError(null);
  }, []);

  const testConnectionFn = useCallback(async () => {
    if (!config || config.dataPath === '__demo__') return;
    setIsConnecting(true);
    setError(null);
    try {
      await fbTestConnection(config.dataPath || 'leituras');
      setIsConnected(true);
    } catch (e) {
      setError(e.message);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, [config]);

  return {
    config,
    isConfigured: config !== null,
    isDemo: config?.dataPath === '__demo__',
    isConnected,
    isConnecting,
    error,
    saveConfig,
    clearConfig,
    testConnection: testConnectionFn,
  };
}

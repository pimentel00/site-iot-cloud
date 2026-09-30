import { useState, useEffect, useMemo } from 'react';
import { subscribeToData, isInitialized } from '../services/firebase';

export default function useFirebaseData(dataPath, limit = 100) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!dataPath || dataPath === '__demo__' || !isInitialized()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = subscribeToData(dataPath, limit, (newData, err) => {
      if (err) {
        setError(err.message);
      } else {
        setData(newData);
        setLastUpdate(new Date());
        setError(null);
      }
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dataPath, limit]);

  const currentData = useMemo(() => {
    if (data.length === 0) return null;
    return data[data.length - 1];
  }, [data]);

  const previousData = useMemo(() => {
    if (data.length < 2) return null;
    return data[data.length - 2];
  }, [data]);

  const stats = useMemo(() => {
    if (data.length === 0) return null;
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
  }, [data]);

  return { data, currentData, previousData, stats, isLoading, error, lastUpdate };
}

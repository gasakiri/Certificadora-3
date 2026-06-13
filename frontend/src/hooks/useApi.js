import { useState, useEffect } from 'react';

export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, deps);

  return { data, loading, error, refresh };
}

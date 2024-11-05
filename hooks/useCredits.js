import { useState, useEffect, useCallback } from 'react';
import { getCredits, checkCredits } from '../utils/db';
import { useAuthContext } from '../components/AuthProvider';

export const useCredits = () => {
  const { user } = useAuthContext();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCredits = useCallback(async () => {
    if (!user) {
      setCredits(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userCredits = await getCredits();
      setCredits(userCredits);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const hasEnoughCredits = useCallback(async () => {
    if (!user) return false;
    try {
      const balance = await checkCredits();
      return balance > 0;
    } catch (error) {
      return false;
    }
  }, [user]);

  const getNextRefill = useCallback(() => {
    if (!credits?.lastRefill) return null;
    
    const lastRefill = credits.lastRefill.toDate();
    const nextRefill = new Date(lastRefill.getTime() + 24 * 60 * 60 * 1000); // 24 hours from last refill
    return nextRefill;
  }, [credits]);

  return {
    credits,
    loading,
    error,
    refresh: fetchCredits,
    hasEnoughCredits,
    getNextRefill
  };
};

export default useCredits;

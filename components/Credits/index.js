import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import useCredits from '../../hooks/useCredits';

export const Credits = () => {
  const { credits, loading } = useCredits();
  const [timeToRefill, setTimeToRefill] = useState('');
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (!credits) return;

    // Pulse animation when credits change
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();

    // Update time to next refill
    const updateTimeToRefill = () => {
      const nextRefill = new Date(credits.lastRefill.toDate().getTime() + 24 * 60 * 60 * 1000);
      const now = new Date();
      const diff = nextRefill - now;

      if (diff <= 0) {
        setTimeToRefill('Refreshing soon...');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeToRefill(`${hours}h ${minutes}m`);
    };

    updateTimeToRefill();
    const interval = setInterval(updateTimeToRefill, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [credits, pulseAnim]);

  if (loading || !credits) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.creditContainer,
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <Text style={styles.creditValue}>{credits.balance}</Text>
        <Text style={styles.creditLabel}>CREDITS</Text>
      </Animated.View>
      
      {credits.balance === 0 && (
        <View style={styles.refillContainer}>
          <Text style={styles.refillText}>Next refill in:</Text>
          <Text style={styles.refillTime}>{timeToRefill}</Text>
        </View>
      )}

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {credits.totalGenerated} images generated
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 10
  },
  creditContainer: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 15,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  creditValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  creditLabel: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.9,
    letterSpacing: 1,
  },
  refillContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  refillText: {
    fontSize: 14,
    color: '#666',
  },
  refillTime: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 2,
  },
  statsContainer: {
    marginTop: 8,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  }
});

export default Credits;

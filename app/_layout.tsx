import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { initDatabase } from '../utils/db';

export default function Layout() {
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        if (Platform.OS === 'web') {
          console.log('Web storage initialized');
        } else {
          console.log('SQLite database initialized');
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: 'AI Image Generator',
        }}
      />
    </Stack>
  );
}

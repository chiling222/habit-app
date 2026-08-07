import { Huninn_400Regular } from '@expo-google-fonts/huninn';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabs, TabKey } from './src/navigation/BottomTabs';
import { DreamScreen } from './src/screens/DreamScreen';
import { HabitScreen } from './src/screens/HabitScreen';
import { PocketScreen } from './src/screens/PocketScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [tab, setTab] = useState<TabKey>('habit');
  const [fontsLoaded, fontError] = useFonts({ Huninn_400Regular });

  const onReady = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {tab === 'habit' && <HabitScreen />}
          {tab === 'pocket' && <PocketScreen />}
          {tab === 'dream' && <DreamScreen />}
        </View>
        <BottomTabs active={tab} onChange={setTab} />
      </View>
    </SafeAreaProvider>
  );
}

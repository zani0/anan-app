import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/useColorScheme';

import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<'(tabs)' | '(onboarding)/choose-role'>('(tabs)');

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem('isOnboarded');
      setInitialRoute(onboarded === 'true' ? '(tabs)' : '(onboarding)/choose-role');
      setIsReady(true);
    };

    checkOnboarding();
  }, []);

  if (!loaded || !isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-[#5d198a]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={initialRoute}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)/choose-role" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)/verify-age" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

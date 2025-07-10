import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [progress, setProgress] = useState(0);
  const [initialRoute, setInitialRoute] = useState<'(tabs)' | '(onboarding)/choose-role'>('(tabs)');

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            SplashScreen.hideAsync();
            clearInterval(timer);
            return 100;
          }
          return prev + 1;
        });
      }, 40);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || progress < 100) {
    return (
      <View className="flex-1 items-center justify-center bg-[#5d198a] px-8">
        <Image
          source={require('../assets/images/anansesem-logo.png')} 
          className="w-24 h-24 mb-6"
          resizeMode="contain"
        />
        <Text className="text-white text-xl font-[Poppins_700Bold] mb-6">Anansesem</Text>

        <View className="w-full h-3 bg-white/30 rounded-full mb-3 overflow-hidden">
          <View
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text className="text-white font-[Poppins_400Regular]">{progress}%</Text>
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

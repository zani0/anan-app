import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Caprasimo_400Regular } from "@expo-google-fonts/caprasimo";

// import { UserProvider } from "@/context/UserContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Caprasimo_400Regular,
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [progress, setProgress] = useState(0);
  const [initialRoute, setInitialRoute] = useState<
    "(tabs)" | "(onboarding)" | null
  >(null);

  // Check onboarding + login status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");

        if (isLoggedIn === "true") {
          setInitialRoute("(tabs)");
        } else {
          setInitialRoute(hasOnboarded === "true" ? "(tabs)" : "(onboarding)");
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        setInitialRoute("(onboarding)"); // fallback
      }
    };

    checkAuthStatus();
  }, []);

  // Animate splash screen loader
  useEffect(() => {
    if (fontsLoaded && initialRoute) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            SplashScreen.hideAsync();
            clearInterval(timer);
            return 100;
          }
          return prev + 1;
        });
      }, 60);
    }
  }, [fontsLoaded, initialRoute]);

  // Splash screen while loading
  if (!fontsLoaded || !initialRoute || progress < 100) {
    return (
      <View className="flex-1 items-center justify-center bg-[#60178b] px-8">
        <View className="items-center mb-20">
          <Image
            source={require("@/assets/images/anansesem-logo-white.png")}
            className="h-[100px]"
            resizeMode="center"
          />
          <Text className="text-[35px] font-caprasimo text-[#D0EE30]">
            Anansesem
          </Text>
        </View>

        <View className="w-full h-3 bg-white/30 rounded-full my-6 overflow-hidden">
          <View className="h-full bg-white" style={{ width: `${progress}%` }} />
        </View>

        <Text className="text-white font-caprasimo">
          {Math.floor(progress)}%
        </Text>
      </View>
    );
  }

  // Main layout after loading
  return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName={initialRoute}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(onboarding)/choose-role"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(onboarding)/verify-age"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(story-creator)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar hidden />
      </ThemeProvider>
  );
}

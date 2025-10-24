import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { useAuthStore } from "@/store/authStore";

// Keep splash visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const { restoreSession, isLoading } = useAuthStore();

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return <ActivityIndicator color={colors.primary} size="large" />;
  }

  useEffect(() => {
    restoreSession();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

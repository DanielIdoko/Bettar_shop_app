import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
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
import SignUpPage from "./(auth)/register";
import { SafeAreaView } from "react-native-safe-area-context";
import Welcome from "./Welcome";

// Keep splash visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { restoreSession, isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{
          padding: 20,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  // Manage Onboarding view
  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <ActivityIndicator color={colors.primary} size="large" />
        <Text
          style={{
            fontSize: 14,
            padding: 10,
            fontWeight: '600',
            color: colors.primary,
          }}
        >
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  if (!hasOnboarded) {
    return <Welcome onComplete={() => setHasOnboarded(true)} />;
  }

  if (!isAuthenticated) {
    return <SignUpPage />;
  }

  useEffect(() => {
    restoreSession();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

// MEMBER 3 — Root layout: AuthProvider + route guard (useSegments)
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // tunggu sampai status login pasti

    const inAuthGroup = (segments as string[])[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("./(auth)/login"); // belum login -> ke login
    } else if (session && inAuthGroup) {
      router.replace("./"); // sudah login -> masuk Home
    }
  }, [session, isLoading, segments]);

  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>

      {/* Loading shield: menutupi layar selama session dibaca, supaya tidak berkedip */}
      {isLoading && (
        <View style={styles.shield}>
          <ActivityIndicator size="large" color="#38BDF8" />
        </View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0B1026" },
  shield: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#0B1026",
    justifyContent: "center",
    alignItems: "center",
  },
});
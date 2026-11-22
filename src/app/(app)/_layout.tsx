// Layout grup (app): isi layout Modul 2 dipindahkan ke sini tanpa perubahan
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B1026" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#0B1026" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Focus Orbit" }} />
      <Stack.Screen
        name="mission"
        options={{
          title: "Mission Control",
          headerBackVisible: false, // keluar hanya lewat tombol Abort
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Mission Complete",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}

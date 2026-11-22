// MEMBER 2 — Layout grup (auth)
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0B1026" },
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}

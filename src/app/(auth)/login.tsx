// MEMBER 2 — Login & Register dengan Supabase Auth
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput
} from "react-native";

import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callsign, setCallsign] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (loading) return; // cegah submit ganda

    const cleanEmail = email.trim(); // buang spasi tak terlihat dari keyboard
    const cleanCallsign = callsign.trim();

    if (cleanEmail === "" || password === "") {
      Alert.alert("Focus Orbit", "Please fill in your email and password.");
      return;
    }
    if (isRegistering && cleanCallsign === "") {
      Alert.alert("Focus Orbit", "Please choose a callsign.");
      return;
    }
    if (isRegistering && password.length < 6) {
      Alert.alert("Focus Orbit", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        // Sign Up: callsign dikirim sebagai metadata
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { data: { callsign: cleanCallsign } },
        });
        if (error) throw error;

        Alert.alert(
          "Welcome aboard! 🚀",
          data.session
            ? `Callsign ${cleanCallsign} is registered.`
            : "Registration successful. Confirm your email, then sign in.",
        );
      } else {
        // Sign In: kalau berhasil, AuthContext menangkap session
        // dan route guard di _layout memindahkan ke Home
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      Alert.alert(
        "Access Denied",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={s.title}>🚀 Focus Orbit</Text>
      <Text style={s.subtitle}>
        {isRegistering
          ? "Enlist as a new astronaut"
          : "Sign in to your cockpit"}
      </Text>

      <TextInput
        style={s.input}
        placeholder="Email"
        placeholderTextColor="#7F8BB5"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {isRegistering && (
        <TextInput
          style={s.input}
          placeholder="Callsign (example: ShadowRunner)"
          placeholderTextColor="#7F8BB5"
          value={callsign}
          onChangeText={setCallsign}
          autoCapitalize="none"
        />
      )}

      <TextInput
        style={s.input}
        placeholder="Password"
        placeholderTextColor="#7F8BB5"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#38BDF8" style={s.loader} />
      ) : (
        <Pressable style={s.button} onPress={handleAuth} disabled={loading}>
          <Text style={s.buttonText}>
            {isRegistering ? "ENLIST AS ASTRONAUT" : "AUTHENTICATE & LAUNCH"}
          </Text>
        </Pressable>
      )}

      <Pressable
        onPress={() => setIsRegistering(!isRegistering)}
        disabled={loading}
      >
        <Text style={s.toggle}>
          {isRegistering
            ? "Already enlisted? Sign in here"
            : "New here? Register here"}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0B1026",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    color: "#B8C0D9",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#171E3D",
    color: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#8B5CF6",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  loader: { marginTop: 10 },
  toggle: { color: "#38BDF8", textAlign: "center", marginTop: 20 },
});

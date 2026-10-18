// MEMBER 3 — Result: tampil hasil, dismissTo("/") kembali ke Home
import { Button, Text, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { styles } from "../styles/styles";

export default function Result() {
  const router = useRouter();
  const { task, planetName, icon, duration } = useLocalSearchParams<{
    task: string;
    planetName: string;
    icon: string;
    duration: string;
  }>();

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.planetEmoji}>{icon}</Text>
      <Text style={styles.title}>Landed on {planetName}! 🎉</Text>
      <Text style={styles.subtitle}>
        You focused for {duration} minutes on:
      </Text>
      <Text style={styles.resultTask}>{task}</Text>

      <View style={styles.button}>
        <Button
          title="LAUNCH NEW MISSION 🚀"
          onPress={() => router.dismissTo("/")}
        />
      </View>
    </View>
  );
}

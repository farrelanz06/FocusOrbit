import { Alert, Button, Text, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { planets } from "../data/planets";
import { styles } from "../styles/styles";

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export default function Mission() {
  const router = useRouter();
  const { task, planetId } = useLocalSearchParams<{
    task: string;
    planetId: string;
  }>();

  const planet = planets.find((p) => p.id === Number(planetId));

  const [secondsLeft, setSecondsLeft] = useState((planet?.duration ?? 0) * 60);
  const [isRunning, setIsRunning] = useState(true);

  // useEffect #1: hitung mundur tiap 1 detik selama isRunning true
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [isRunning]);

  // useEffect #2: ketika waktu habis -> replace ke Result
  useEffect(() => {
    if (planet && secondsLeft <= 0) {
      router.replace({
        pathname: "../result",
        params: {
          task,
          planetName: planet.name,
          icon: planet.icon,
          duration: String(planet.duration),
        },
      });
    }
  }, [secondsLeft]);

  const abortMission = () => {
    Alert.alert("Abort Mission?", "Your progress will be lost.", [
      { text: "Stay", style: "cancel" },
      {
        text: "Abort",
        style: "destructive",
        onPress: () => {
          // canGoBack: aman kalau halaman ini dibuka tanpa history
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        },
      },
    ]);
  };

  if (!planet) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Planet not found 🛸</Text>
        <Button title="Back to Earth" onPress={() => router.replace("/")} />
      </View>
    );
  }

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.planetEmoji}>{planet.icon}</Text>
      <Text style={styles.title}>Journey to {planet.name}</Text>
      <Text style={styles.subtitle}>Task: {task}</Text>

      <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>

      <View style={styles.button}>
        <Button
          title={isRunning ? "PAUSE ⏸" : "RESUME ▶"}
          onPress={() => setIsRunning(!isRunning)}
        />
      </View>

      <View style={styles.button}>
        <Button title="ABORT MISSION" color="#D64545" onPress={abortMission} />
      </View>

      {/* Tombol demo supaya mudah dites saat asistensi, hapus kalau tidak perlu */}
      <View style={styles.button}>
        <Button
          title="Skip to finish (demo)"
          color="#555"
          onPress={() => setSecondsLeft(0)}
        />
      </View>
    </View>
  );
}

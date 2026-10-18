import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { planets } from "../data/planets";
import { styles } from "../styles/styles";
import { Planet } from "../types/planet";

export default function Index() {
  const router = useRouter();

  const [task, setTask] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [tip, setTip] = useState("Choose a planet to see your mission tip.");

  // useEffect: jalan setiap selectedPlanet berubah
  useEffect(() => {
    if (selectedPlanet === null) return;
    setTip(
      `Mission tip: ${selectedPlanet.name} = ${selectedPlanet.duration} minutes. Keep your phone away!`,
    );
  }, [selectedPlanet]);

  const selectPlanet = (planet: Planet) => {
    setSelectedPlanet(planet);
  };

  const startFocus = () => {
    if (task.trim() === "") {
      Alert.alert("Focus Orbit", "Please enter your learning task first.");
      return;
    }

    if (selectedPlanet === null) {
      Alert.alert("Focus Orbit", "Please choose a planet first.");
      return;
    }

    // router.push: Mission ditumpuk di atas Home, bisa kembali dengan back()
    router.push({
      pathname: "../mission",
      params: { task: task.trim(), planetId: String(selectedPlanet.id) },
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#0B1026" }}>
      <View style={styles.container}>
        <Text style={styles.title}>🚀 Focus Orbit</Text>

        <Text style={styles.subtitle}>
          Turn your study session into a space journey.
        </Text>

        <Text style={styles.sectionTitle}>Choose Your Learning Planet</Text>

        {planets.map((planet) => (
          <Pressable
            key={planet.id}
            onPress={() => selectPlanet(planet)}
            style={[
              styles.planetCard,
              selectedPlanet?.id === planet.id && styles.selectedCard,
            ]}
          >
            <Text style={styles.planetName}>
              {planet.icon} {planet.name}
            </Text>

            <Text style={styles.duration}>
              Focus: {planet.duration} minutes
            </Text>

            <Text style={styles.description}>{planet.description}</Text>
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Learning Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Example: Study React Native"
          value={task}
          onChangeText={setTask}
        />

        <Text style={styles.selectedText}>{tip}</Text>

        <View style={styles.button}>
          <Button title="START FOCUS 🚀" onPress={startFocus} />
        </View>

        <Text style={styles.footerText}>
          Your journey begins with one focused session.
        </Text>
      </View>
    </ScrollView>
  );
}

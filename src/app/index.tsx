import { Alert, Button, Pressable, Text, TextInput, View } from "react-native";

import { useState } from "react";

import { planets } from "../data/planets";
import { styles } from "../styles/styles";
import { Planet } from "../types/planet";

export default function Index() {
  const [task, setTask] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const selectPlanet = (planet: Planet) => {
    setSelectedPlanet(planet);
  };

  const startFocus = () => {
    if (task === "") {
      Alert.alert("Focus Orbit", "Please enter your learning task first.");
      return;
    }

    if (selectedPlanet === null) {
      Alert.alert("Focus Orbit", "Please choose a planet first.");
      return;
    }

    Alert.alert(
      "Mission Ready 🚀",
      `Task: ${task}\nPlanet: ${selectedPlanet.name}\nFocus: ${selectedPlanet.duration} minutes`,
    );
  };

  return (
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

          <Text style={styles.duration}>Focus: {planet.duration} minutes</Text>

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

      {selectedPlanet && (
        <Text style={styles.selectedText}>
          Selected mission: {selectedPlanet.icon} {selectedPlanet.name} —{" "}
          {selectedPlanet.duration} minutes
        </Text>
      )}

      <View style={styles.button}>
        <Button title="START FOCUS 🚀" onPress={startFocus} />
      </View>

      <Text
        style={{
          color: "#7F8BB5",
          textAlign: "center",
          marginTop: 20,
          fontSize: 12,
        }}
      >
        Your journey begins with one focused session.
      </Text>
    </View>
  );
}

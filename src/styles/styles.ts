import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0B1026",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 30,
  },

  subtitle: {
    fontSize: 16,
    color: "#B8C0D9",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },

  planetCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#182044",
  },

  selectedCard: {
    backgroundColor: "#26356F",
  },

  planetName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  duration: {
    fontSize: 15,
    color: "#9EA9D1",
    marginTop: 5,
  },

  description: {
    fontSize: 13,
    color: "#C8CEE3",
    marginTop: 5,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  selectedText: {
    color: "#D8DEFF",
    fontSize: 15,
    marginBottom: 15,
  },

  button: {
    marginTop: 10,
  },
});

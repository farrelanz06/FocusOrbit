// MEMBER 3
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={s.box}>
      <ActivityIndicator color="#38BDF8" />
      <Text style={s.text}>Contacting mission control...</Text>
    </View>
  );
}

const s = StyleSheet.create({
  box: { alignItems: "center", padding: 16 },
  text: { color: "#B8C0D9", marginTop: 8, fontSize: 13 },
});

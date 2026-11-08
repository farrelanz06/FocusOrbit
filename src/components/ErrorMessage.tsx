// MEMBER 3
import { Button, StyleSheet, Text, View } from "react-native";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <View style={s.box}>
      <Text style={s.text}>📡 Signal lost: {message}</Text>
      <Button title="Try again" onPress={onRetry} />
    </View>
  );
}

const s = StyleSheet.create({
  box: { padding: 16, alignItems: "center" },
  text: { color: "#FB923C", marginBottom: 8, textAlign: "center" },
});

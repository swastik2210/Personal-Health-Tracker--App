import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Colors } from "../theme/colors";

export default function QuickActionButton({ label, onPress }: any) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: 200 }}
    >
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    minWidth: 105,
    alignItems: "center",
  },
  text: {
    color: Colors.primary,
    fontWeight: "700",
  },
});

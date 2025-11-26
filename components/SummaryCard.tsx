import { View, Text, StyleSheet } from "react-native";

export default function SummaryCard({ title, value }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    color: "#777",
    fontWeight: "500",
  },
  value: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 6,
    color: "#7B42F6", // purple
  },
});

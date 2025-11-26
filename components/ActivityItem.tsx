import { View, Text, StyleSheet } from "react-native";

export default function ActivityItem({ item }: { item: any }) {
  const time = new Date(item.time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.type}>{item.type.toUpperCase()}</Text>
        <Text style={styles.value}>
          {item.value}
          {item.type === "water"
            ? " glasses"
            : item.type === "steps"
            ? " steps"
            : " hrs"}
        </Text>
      </View>

      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  type: {
    fontSize: 14,
    fontWeight: "700",
  },
  value: {
    marginTop: 6,
    fontSize: 16,
  },
  time: {
    color: "#666",
    alignSelf: "center",
  },
});

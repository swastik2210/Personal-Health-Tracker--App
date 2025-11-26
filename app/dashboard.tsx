import { useFocusEffect, useRouter } from "expo-router";
import { MotiView } from "moti";
import { useCallback, useEffect, useState } from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { loadActivities } from "../utils/storage";

export default function Dashboard() {
  const router = useRouter();
  const [activities, setActivities] = useState<any[]>([]);

  const today = new Date().toLocaleDateString();

  useEffect(() => {
    loadActivities().then((data) => setActivities(data || []));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadActivities().then((data) => setActivities(data || []));
    }, [])
  );

  const totalWater = activities
    .filter((a) => a.type === "water")
    .reduce((sum, a) => sum + a.value, 0);

  const totalSteps = activities
    .filter((a) => a.type === "steps")
    .reduce((sum, a) => sum + a.value, 0);

  const totalSleep = activities
    .filter((a) => a.type === "sleep")
    .reduce((sum, a) => sum + a.value, 0);

  const summaryCards = [
    { id: 1, title: "Water Intake", value: `${totalWater} glasses` },
    { id: 2, title: "Steps Walked", value: `${totalSteps}` },
    { id: 3, title: "Sleep Hours", value: `${totalSleep} hrs` },
  ];

  return (
    <LinearGradient
      colors={["#4A2C82", "#6A4BBC", "#EEE6FF"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Date */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <Text style={styles.date}>{today}</Text>
        </MotiView>

        {/* Summary Cards */}
        {summaryCards.map((card, index) => (
          <MotiView
            key={card.id}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 500,
              delay: index * 250,
            }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardValue}>{card.value}</Text>
          </MotiView>
        ))}

        {/* Quick Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 900 }}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/logActivity?type=water")}
            >
              <Text style={styles.actionText}>Water</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/logActivity?type=steps")}
            >
              <Text style={styles.actionText}>Steps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/logActivity?type=sleep")}
            >
              <Text style={styles.actionText}>Sleep</Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* History Button */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 600, delay: 1100 }}
        >
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => router.push("/history")}
          >
            <Text style={styles.historyText}>View History</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  date: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F3ECFF",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#6A4BBC",
  },
  cardTitle: {
    color: "#6A4BBC",
    fontSize: 15,
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 5,
    color: "#4A2C82",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F3ECFF",
    marginTop: 20,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: {
    backgroundColor: "#6A4BBC",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  actionText: {
    color: "#FFF",
    fontWeight: "700",
  },
  historyBtn: {
    backgroundColor: "#4A2C82",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },
  historyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

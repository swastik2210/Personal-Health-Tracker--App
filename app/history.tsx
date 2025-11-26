import { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View, RefreshControl } from "react-native";
import { loadActivities } from "../utils/storage";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";

export default function History() {
  const [activities, setActivities] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const data = await loadActivities();
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const filtered = (data || []).filter((item: any) => {
      const date = new Date(item.time);
      return date >= sevenDaysAgo;
    });

    setActivities(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const grouped = activities.reduce((acc: any, item: any) => {
    const date = new Date(item.time).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const dates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Calculate totals for each date
  function getTotals(items: any[]) {
    const water = items
      .filter((i) => i.type === "water")
      .reduce((sum, i) => sum + i.value, 0);

    const steps = items
      .filter((i) => i.type === "steps")
      .reduce((sum, i) => sum + i.value, 0);

    const sleep = items
      .filter((i) => i.type === "sleep")
      .reduce((sum, i) => sum + i.value, 0);

    return { water, steps, sleep };
  }

  return (
    <LinearGradient
      colors={["#4A2C82", "#6A4BBC", "#EEE6FF"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>History (Last 7 Days)</Text>

        {dates.length === 0 && (
          <Text style={styles.empty}>No activities logged yet.</Text>
        )}

        {dates.map((date, idx) => {
          const totals = getTotals(grouped[date]);

          return (
            <MotiView
              key={date}
              from={{ opacity: 0, translateY: 15 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: idx * 120 }}
            >
              <View style={styles.group}>
                <Text style={styles.groupTitle}>{date}</Text>

                {/* DAY TOTALS */}
                <View style={styles.totalsCard}>
                  <Text style={styles.totalText}>
                    Water: {totals.water} glasses
                  </Text>
                  <Text style={styles.totalText}>
                    Steps: {totals.steps}
                  </Text>
                  <Text style={styles.totalText}>
                    Sleep: {totals.sleep} hrs
                  </Text>
                </View>

                {/* Individual entries */}
                {grouped[date].map((item: any) => (
                  <View key={item.id} style={styles.item}>
                    <Text style={styles.itemType}>
                      {item.type.toUpperCase()}
                    </Text>

                    <Text style={styles.itemValue}>{item.value}</Text>

                    <Text style={styles.itemTime}>
                      {formatTime(item.time)}
                    </Text>

                    {item.notes ? (
                      <Text style={styles.itemNotes}>Note: {item.notes}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </MotiView>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#FFF",
    fontWeight: "600",
  },

  group: { marginBottom: 30 },

  groupTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#F3ECFF",
    marginBottom: 12,
  },

  totalsCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: "#4A2C82",
    elevation: 4,
  },

  totalText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4A2C82",
    marginBottom: 4,
  },

  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: "#4A2C82",
  },

  itemType: { fontWeight: "800", fontSize: 16, color: "#4A2C82" },

  itemValue: { marginTop: 4, fontSize: 15, color: "#222" },

  itemTime: {
    marginTop: 4,
    fontSize: 13,
    color: "#6A4BBC",
    fontWeight: "600",
  },

  itemNotes: {
    marginTop: 4,
    color: "#666",
    fontStyle: "italic",
  },
});

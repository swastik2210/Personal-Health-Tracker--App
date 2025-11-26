import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "HEALTH_TRACKER_ACTIVITIES";

// Save a new activity
export async function saveActivity(activity: any) {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const activities = stored ? JSON.parse(stored) : [];

    activities.push(activity);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch (error) {
    console.log("Error saving activity:", error);
  }
}

// Get all stored activities
export async function loadActivities() {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Error loading activities:", error);
    return [];
  }
}

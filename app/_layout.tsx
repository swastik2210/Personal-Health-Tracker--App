import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4A2C82", // unified theme
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 20,
          },
          headerShadowVisible: false,
        }}
      >
        {/* Onboarding */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        {/* Onboarding2 */}
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false, // for full-screen intro
          }}
        />

        {/* Dashboard */}
        <Stack.Screen
          name="dashboard"
          options={{
            title: "Wellness Dashboard",
            headerStyle: { backgroundColor: "#4A2C82" }, 
          }}
        />

        {/* Log Activity */}
        <Stack.Screen
          name="logActivity"
          options={{
            title: "Log Activity",
            headerStyle: { backgroundColor: "#4A2C82" }, 
          }}
        />

        {/* History */}
        <Stack.Screen
          name="history"
          options={{
            title: "Activity History",
            headerStyle: { backgroundColor: "#4A2C82" }, 
          }}
        />
      </Stack>
    </>
  );
}

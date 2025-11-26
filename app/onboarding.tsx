import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Fullscreen Background Image */}
      <ImageBackground
        source={require("../assets/images/FinalImg.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* App Title Over Image */}
        <MotiView
          from={{ opacity: 0, translateY: -25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 700 }}
          style={styles.titleContainer}
        >
          <Text style={styles.appTitle}>Personal</Text>
          <Text style={styles.appTitle2}>Health Tracker</Text>
        </MotiView>
      </ImageBackground>

      {/* ⭐ Bottom Modern Frosted Container */}
      <View style={styles.bottomContainer}>
        <MotiView
          from={{ opacity: 0, translateY: 25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, duration: 700 }}
          style={{ width: "100%" }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/dashboard")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "80%", 
    justifyContent: "flex-end",
  },

  titleContainer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },

  appTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 8,
    letterSpacing: 0.5,
    marginBottom: 15,
  },

  appTitle2: {
    fontSize: 42,
    fontWeight: "900",
    color: "#D4C4FF",
    marginTop:-20,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },

  bottomContainer: {
    height: "20%",
    backgroundColor: "rgba(255,255,255,0.96)",
    paddingHorizontal: 25,
    paddingTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  button: {
    backgroundColor: "#4A2C82",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    shadowColor: "#4A2C82",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

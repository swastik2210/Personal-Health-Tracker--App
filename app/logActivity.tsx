import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { saveActivity } from "../utils/storage";
import { MotiView } from "moti";

export default function LogActivity() {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSave() {
    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      type,
      value: Number(value),
      notes,
      time: new Date().toISOString(),
    };

    saveActivity(newActivity);
    setShowSuccess(true);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Log {type}</Text>

          {/* VALUE FIELD */}
          <Text style={styles.label}>
            Value (
            {type === "water"
              ? "glasses"
              : type === "steps"
              ? "steps"
              : "hours"}
            )
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter value"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          {/* NOTES FIELD */}
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Enter notes"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* SAVE BUTTON */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Activity</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* SUCCESS POPUP */}
        {showSuccess && (
          <View style={styles.modalOverlay}>
            <MotiView
              from={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "timing", duration: 350 }}
              style={styles.modalBox}
            >
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successText}>Saved Successfully!</Text>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setShowSuccess(false);
                  router.back();
                }}
              >
                <Text style={styles.modalBtnText}>Continue</Text>
              </TouchableOpacity>
            </MotiView>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4A2C82",
    marginBottom: 25,
  },

  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#4A2C82",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E3D9FF",
  },

  saveBtn: {
    backgroundColor: "#4A2C82",
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    elevation: 4,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 10,
  },

  successIcon: {
    fontSize: 55,
    color: "#4A2C82",
    fontWeight: "900",
    marginBottom: 10,
  },

  successText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A2C82",
    marginBottom: 20,
  },

  modalBtn: {
    backgroundColor: "#4A2C82",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 10,
  },

  modalBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

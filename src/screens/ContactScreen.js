/*
  --- SCREEN: ContactScreen ---
  Two forms matching the Better Choices web application:
    1. Submit Feedback — with feedback type selector
    2. Request Restaurant — with location field
  Uses EmailJS REST API with the same service/template IDs as the web app.
*/

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

// EmailJS configuration — matches the web application
const SERVICE_ID = "service_7yv2erl";
const PUBLIC_KEY = "HQ82I9p_2nEF2WY9h";
const FEEDBACK_TEMPLATE = "template_0fhfspu";
const RESTAURANT_TEMPLATE = "template_lks3wnf";

// Send email via EmailJS REST API
const sendEmail = async (templateId, templateParams) => {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      public_key: PUBLIC_KEY,
      template_params: templateParams,
    }),
  });
  if (!response.ok) throw new Error("Failed to send");
};

export default function ContactScreen() {
  const [sending, setSending] = useState(false);

  // Feedback form state
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("General Feedback");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Restaurant request form state
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [requestReason, setRequestReason] = useState("");

  const handleSubmitFeedback = async () => {
    if (!feedbackName.trim() || !feedbackEmail.trim() || !feedbackMessage.trim()) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      await sendEmail(FEEDBACK_TEMPLATE, {
        from_name: feedbackName.trim(),
        from_email: feedbackEmail.trim(),
        message_type: feedbackType,
        message: feedbackMessage.trim(),
      });
      Alert.alert("Success", "Feedback sent successfully! Thank you.");
      setFeedbackName("");
      setFeedbackEmail("");
      setFeedbackType("General Feedback");
      setFeedbackMessage("");
    } catch {
      Alert.alert("Error", "Failed to send. Please try again later.");
    }
    setSending(false);
  };

  const handleRequestRestaurant = async () => {
    if (!requestName.trim() || !requestEmail.trim() || !restaurantName.trim()) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      await sendEmail(RESTAURANT_TEMPLATE, {
        from_name: requestName.trim(),
        from_email: requestEmail.trim(),
        restaurant_name: restaurantName.trim(),
        restaurant_location: restaurantLocation.trim(),
        request_reason: requestReason.trim(),
      });
      Alert.alert("Success", "Request sent successfully! Thank you.");
      setRequestName("");
      setRequestEmail("");
      setRestaurantName("");
      setRestaurantLocation("");
      setRequestReason("");
    } catch {
      Alert.alert("Error", "Failed to send. Please try again later.");
    }
    setSending(false);
  };

  // Feedback type options
  const feedbackTypes = ["General Feedback", "Bug Report", "Feature Request", "Other"];

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>📬 Contact Us</Text>
      <Text style={styles.subtitle}>We'd love to hear from you!</Text>

      {/* Submit Feedback Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>💬 Submit Feedback</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name *"
          placeholderTextColor="#999"
          value={feedbackName}
          onChangeText={setFeedbackName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email *"
          placeholderTextColor="#999"
          value={feedbackEmail}
          onChangeText={setFeedbackEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {/* Feedback Type Selector */}
        <View style={styles.typeRow}>
          {feedbackTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeChip, feedbackType === type && styles.typeChipActive]}
              onPress={() => setFeedbackType(type)}
            >
              <Text style={[styles.typeText, feedbackType === type && styles.typeTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your feedback... *"
          placeholderTextColor="#999"
          value={feedbackMessage}
          onChangeText={setFeedbackMessage}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmitFeedback}
          disabled={sending}
        >
          <Text style={styles.buttonText}>
            {sending ? "Sending..." : "Submit Feedback"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Request Restaurant Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>🍔 Request a Restaurant</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name *"
          placeholderTextColor="#999"
          value={requestName}
          onChangeText={setRequestName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email *"
          placeholderTextColor="#999"
          value={requestEmail}
          onChangeText={setRequestEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name *"
          placeholderTextColor="#999"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        <TextInput
          style={styles.input}
          placeholder="Location (e.g., Nationwide)"
          placeholderTextColor="#999"
          value={restaurantLocation}
          onChangeText={setRestaurantLocation}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Why should we add this restaurant?"
          placeholderTextColor="#999"
          value={requestReason}
          onChangeText={setRequestReason}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRequestRestaurant}
          disabled={sending}
        >
          <Text style={styles.buttonText}>
            {sending ? "Sending..." : "Submit Request"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5b2d8e",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    shadowColor: "#3c0e5a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: { fontSize: 18, fontWeight: "700", color: "#5b2d8e", marginBottom: 16 },
  input: {
    backgroundColor: "#f9f4fc",
    borderWidth: 1,
    borderColor: "#e4d8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2d1050",
    marginBottom: 12,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  typeRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  typeChip: {
    backgroundColor: "#f9f4fc",
    borderWidth: 1,
    borderColor: "#e4d8f0",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  typeChipActive: { backgroundColor: "#5b2d8e", borderColor: "#5b2d8e" },
  typeText: { fontSize: 13, color: "#5b2d8e" },
  typeTextActive: { color: "#ffffff" },
  button: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
});

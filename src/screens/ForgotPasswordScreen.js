import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const API_URL = "http://localhost:5001";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !newPassword) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");
      setSuccess(data.message);
      setEmail("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>🔑 Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email and a new password to reset your account.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>New Password</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="Choose a new password" secureTextEntry />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Resetting..." : "Reset Password"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#5b2d8e", textAlign: "center", marginTop: 24 },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 24 },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e4d8f0",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#5b2d8e", marginBottom: 4, marginTop: 12 },
  input: {
    backgroundColor: "#f9f4fc",
    borderWidth: 1,
    borderColor: "#e4d8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: { color: "#d32f2f", marginTop: 12, fontSize: 14 },
  success: { color: "#1f8a5c", marginTop: 12, fontSize: 14, fontWeight: "600" },
  button: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  link: { color: "#7c3aed", textAlign: "center", marginTop: 16, fontWeight: "600" },
});

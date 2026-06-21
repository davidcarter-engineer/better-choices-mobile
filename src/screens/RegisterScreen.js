/*
  --- SCREEN: RegisterScreen ---
  Registration form that creates an account via POST /api/auth/register.
  Collects firstName, lastName, username, email, phone, and password.
  On success, auto-logs in and navigates to Home.
*/

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  async function handleSubmit() {
    if (!username || !email || !password) {
      setError("Username, email, and password are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(username, email, password, firstName, lastName, phone);
      navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>📝 Sign Up</Text>
      <Text style={styles.subtitle}>Create a Better Choices account.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First name" />

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last name" />

        <Text style={styles.label}>Username *</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Choose a username" autoCapitalize="none" />

        <Text style={styles.label}>Email *</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="(555) 555-5555" keyboardType="phone-pad" />

        <Text style={styles.label}>Password *</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Choose a password" secureTextEntry />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Creating account..." : "Sign Up"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
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

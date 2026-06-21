/*
  --- SCREEN: ProfileScreen ---
  Allows users to update first/last name, phone, email, and profile picture.
  Uses expo-image-picker for photo upload and camera access.
*/

import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, updateProfile, changePassword } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhone(user.phone || "");
    setEmail(user.email || "");
    setProfilePic(user.profilePic || "");
  }, [user]);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setProfilePic(base64);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera access is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setProfilePic(base64);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateProfile({ firstName, lastName, phone, email, profilePic });
      setSuccess("Profile updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  }

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) {
      setPwError("Both fields are required.");
      return;
    }
    setChangingPw(true);
    setPwError("");
    setPwSuccess("");
    try {
      const msg = await changePassword(currentPassword, newPassword);
      setPwSuccess(msg);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setPwSuccess(""), 3000);
    } catch (err) {
      setPwError(err.message);
    }
    setChangingPw(false);
  }

  if (!user) return null;

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>👤 My Profile</Text>

      <View style={styles.form}>
        <View style={styles.picSection}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.picPreview} />
          ) : (
            <View style={styles.picPlaceholder}>
              <Text style={styles.picPlaceholderText}>No Photo</Text>
            </View>
          )}
          <View style={styles.picButtons}>
            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
              <Text style={styles.uploadBtnText}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn} onPress={takePhoto}>
              <Text style={styles.uploadBtnText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First name" />

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last name" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="(555) 555-5555" keyboardType="phone-pad" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? "Saving..." : "Save Changes"}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.form, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>🔒 Change Password</Text>

        <Text style={styles.label}>Current Password</Text>
        <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current password" secureTextEntry />

        <Text style={styles.label}>New Password</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New password" secureTextEntry />

        {pwError ? <Text style={styles.error}>{pwError}</Text> : null}
        {pwSuccess ? <Text style={styles.success}>{pwSuccess}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={changingPw}>
          <Text style={styles.buttonText}>{changingPw ? "Updating..." : "Change Password"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#5b2d8e", textAlign: "center", marginTop: 16, marginBottom: 20 },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e4d8f0",
  },
  picSection: { flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 16 },
  picPreview: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: "#e4d8f0" },
  picPlaceholder: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#f9f4fc", borderWidth: 2, borderColor: "#d1c4e9", borderStyle: "dashed",
    justifyContent: "center", alignItems: "center",
  },
  picPlaceholderText: { fontSize: 11, color: "#7c3aed" },
  picButtons: { gap: 8 },
  uploadBtn: { backgroundColor: "#7c3aed", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  uploadBtnText: { color: "#ffffff", fontWeight: "600", fontSize: 13 },
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
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#5b2d8e", marginBottom: 8 },
});

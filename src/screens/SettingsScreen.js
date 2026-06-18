import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>⚙️ Settings</Text>
        <Text style={styles.message}>Settings coming soon!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  title: { fontSize: 24, fontWeight: "700", color: "#5b2d8e", marginBottom: 12 },
  message: { fontSize: 16, color: "#666" },
});

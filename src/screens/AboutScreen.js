import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Better Choices</Text>
        <Text style={styles.text}>
          Better Choices helps you make smarter food decisions in a busy world.
        </Text>
        <Text style={styles.text}>
          By combining nutrition data, meal tracking, and restaurant comparisons,
          this app makes it easy to understand what you eat — and choose foods
          that support your health and wellness goals.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: "700", color: "#5b2d8e", marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 26, color: "#2d1050", marginBottom: 12 },
});

import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function DisclaimerScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>⚠️ Disclaimer</Text>
        <Text style={styles.text}>
          All restaurant logos and images displayed in this app are trademarks of
          their respective owners and are used here for informational purposes only.
          This app is not affiliated with or endorsed by any listed restaurant.
        </Text>
        <Text style={styles.text}>
          Nutritional information provided is approximate and may vary by location.
          Always verify with the restaurant directly for the most up-to-date menu
          and nutrition data.
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

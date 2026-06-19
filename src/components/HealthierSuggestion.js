/*
  --- COMPONENT: HealthierSuggestion ---
  An expandable card that shows a healthier alternative for a logged meal.
  Toggled by the "🌱 Healthier Suggestion" button on each diary entry.
  Uses useState to track expanded/collapsed state per card.
*/

import { View, Text, StyleSheet } from "react-native";
import { getSuggestion } from "../data/suggestions";

export default function HealthierSuggestion({ foodItem, calories }) {
  const suggestion = getSuggestion(foodItem);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🌱 Healthier Alternative</Text>
      <Text style={styles.alternative}>{suggestion.alternative}</Text>

      <Text style={styles.label}>Preparation Tip:</Text>
      <Text style={styles.text}>{suggestion.method}</Text>

      <View style={styles.savingsRow}>
        <Text style={styles.savingsLabel}>Estimated Savings:</Text>
        <Text style={styles.savingsValue}>~{suggestion.savings} fewer calories</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#f0faf5",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#c8e6d9",
  },
  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f8a5c",
    marginBottom: 8,
  },
  alternative: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d1050",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5b2d8e",
    marginBottom: 2,
  },
  text: {
    fontSize: 13,
    color: "#444",
    marginBottom: 8,
    lineHeight: 20,
  },
  savingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#c8e6d9",
  },
  savingsLabel: { fontSize: 13, color: "#666" },
  savingsValue: { fontSize: 14, fontWeight: "700", color: "#1f8a5c" },
});

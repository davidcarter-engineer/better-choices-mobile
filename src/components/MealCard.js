/*
  --- COMPONENT: MealCard ---
  Displays a single meal entry with a delete button and an expandable
  "Healthier Suggestion" section. Each card manages its own expanded
  state using useState so multiple cards can be toggled independently.
*/

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HealthierSuggestion from "./HealthierSuggestion";

export default function MealCard({ item, onDelete }) {
  // Track whether the suggestion card is expanded
  const [showSuggestion, setShowSuggestion] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.cardMeal}>{item.mealName}</Text>
      <Text style={styles.cardDetail}>🥗 {item.foodItem}</Text>
      <Text style={styles.cardDetail}>🔥 {item.calories} calories</Text>

      {/* Healthier Suggestion toggle button */}
      <TouchableOpacity
        style={styles.suggestionButton}
        onPress={() => setShowSuggestion(!showSuggestion)}
        activeOpacity={0.7}
      >
        <Text style={styles.suggestionButtonText}>
          {showSuggestion ? "Hide Suggestion" : "🌱 Healthier Suggestion"}
        </Text>
      </TouchableOpacity>

      {/* Expandable suggestion card */}
      {showSuggestion && (
        <HealthierSuggestion foodItem={item.foodItem} calories={item.calories} />
      )}

      {/* Delete button */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    shadowColor: "#3c0e5a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardMeal: { fontSize: 16, fontWeight: "700", color: "#1f8a5c", marginBottom: 4 },
  cardDetail: { fontSize: 14, color: "#2d1050", marginBottom: 2 },
  suggestionButton: {
    marginTop: 10,
    backgroundColor: "#dff3ea",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  suggestionButtonText: { color: "#1f8a5c", fontWeight: "600", fontSize: 14 },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteText: { color: "#ffffff", fontWeight: "600" },
});

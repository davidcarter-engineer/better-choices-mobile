/*
  --- COMPONENT: RestaurantCard ---
  A reusable card that displays one restaurant's information.

  --- Props ---
  Props are how we pass data from a parent to a child component.
  This component receives: name, healthyScore, recommendedMeal, calories.
  Props are read-only — the child cannot modify them.

  --- StyleSheet ---
  Styles in React Native use flexbox by default.
  There's no CSS cascade — each component manages its own styles.
*/

import { View, Text, StyleSheet } from "react-native";

function RestaurantCard({ name, healthyScore, recommendedMeal, calories }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>⭐ Healthy Score: {healthyScore}/10</Text>
      <Text style={styles.detail}>🥗 Try: {recommendedMeal}</Text>
      <Text style={styles.detail}>🔥 {calories} calories</Text>
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
    // Shadow for iOS
    shadowColor: "#3c0e5a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f8a5c",
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: "#2d1050",
    marginBottom: 3,
  },
});

export default RestaurantCard;

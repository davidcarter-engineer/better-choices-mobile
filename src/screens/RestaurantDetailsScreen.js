/*
  --- SCREEN: RestaurantDetailsScreen ---
  Shows full restaurant details matching the web application:
  - Restaurant info and healthier option/tip
  - Top 10 Healthiest Items with save-to-favorites on each
*/

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../store/favoritesSlice";

export default function RestaurantDetailsScreen({ route }) {
  const { restaurant } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = (mealName) =>
    favorites.some((f) => f.name === mealName);

  const handleSaveItem = (item) => {
    dispatch(
      addFavorite({
        id: `${restaurant.id}-${item.meal}`,
        name: item.meal,
        calories: item.calories,
        restaurant: restaurant.name,
      })
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={restaurant.topHealthyItems || []}
      keyExtractor={(item, index) => `${item.meal}-${index}`}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View>
          {/* Restaurant Info */}
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.score}>
            ⭐ Health Score: {restaurant.healthyScore}/10
          </Text>
          <Text style={styles.detail}>
            🥗 Recommended: {restaurant.recommendedMeal}
          </Text>
          <Text style={styles.detail}>🔥 {restaurant.calories} calories</Text>
          <Text style={styles.description}>{restaurant.description}</Text>

          {/* Healthier Option */}
          {restaurant.healthierOption && (
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>🌱 Healthier Option</Text>
              <Text style={styles.tipText}>
                {restaurant.healthierOption.meal} — {restaurant.healthierOption.calories} cal
              </Text>
              <Text style={styles.tipHint}>💡 {restaurant.healthierTip}</Text>
            </View>
          )}

          {/* Top 10 Header */}
          {restaurant.topHealthyItems && (
            <Text style={styles.sectionTitle}>Top 10 Healthiest Items</Text>
          )}
        </View>
      }
      renderItem={({ item, index }) => (
        <View style={styles.itemCard}>
          <View style={styles.itemRow}>
            <Text style={styles.itemRank}>{index + 1}.</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.meal}</Text>
              <Text style={styles.itemCal}>{item.calories} cal</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.saveButton,
              isFavorite(item.meal) && styles.savedButton,
            ]}
            onPress={() => handleSaveItem(item)}
            disabled={isFavorite(item.meal)}
          >
            <Text style={styles.saveButtonText}>
              {isFavorite(item.meal) ? "✓ Saved" : "♡ Save"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  list: { padding: 20 },
  name: { fontSize: 26, fontWeight: "700", color: "#1f8a5c", marginBottom: 8 },
  score: { fontSize: 16, color: "#2d1050", marginBottom: 4 },
  detail: { fontSize: 16, color: "#2d1050", marginBottom: 4 },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
    marginTop: 12,
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: "#f0faf5",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#c8e6d9",
    marginBottom: 20,
  },
  tipTitle: { fontSize: 16, fontWeight: "700", color: "#1f8a5c", marginBottom: 6 },
  tipText: { fontSize: 15, color: "#2d1050", marginBottom: 6 },
  tipHint: { fontSize: 13, color: "#666", fontStyle: "italic" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5b2d8e",
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  itemRank: { fontSize: 16, fontWeight: "700", color: "#5b2d8e", marginRight: 10 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, color: "#2d1050", fontWeight: "600" },
  itemCal: { fontSize: 13, color: "#666" },
  saveButton: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  savedButton: { backgroundColor: "#a0a0a0" },
  saveButtonText: { color: "#ffffff", fontWeight: "600", fontSize: 13 },
});

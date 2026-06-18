/*
  --- SCREEN: RestaurantDetailsScreen ---
  Shows full details for a selected restaurant and a "Save to Favorites" button.

  --- useSelector ---
  useSelector is a React-Redux hook that reads data FROM the Redux store.
  It takes a selector function that receives the entire state and returns
  the part you need. The component re-renders when that data changes.

  --- useDispatch ---
  useDispatch is a React-Redux hook that returns the store's dispatch function.
  We call dispatch(action) to send actions to the store, triggering reducers
  to update state.
*/

import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

export default function RestaurantDetailsScreen({ route }) {
  const { restaurant } = route.params;

  // useDispatch: get the dispatch function to send actions to the store
  const dispatch = useDispatch();

  // useSelector: read the favorites array from the Redux store
  const isFavorite = useSelector((state) =>
    state.favorites.favorites.some((r) => r.id === restaurant.id)
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id: restaurant.id }));
    } else {
      dispatch(addFavorite(restaurant));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.detail}>
          ⭐ Health Score: {restaurant.healthyScore}/10
        </Text>
        <Text style={styles.detail}>
          🥗 Recommended: {restaurant.recommendedMeal}
        </Text>
        <Text style={styles.detail}>🔥 Calories: {restaurant.calories}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>

        {/* Save to Favorites button */}
        <TouchableOpacity
          style={[styles.button, isFavorite && styles.buttonRemove]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "💔 Remove from Favorites" : "❤️ Save to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  card: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    shadowColor: "#3c0e5a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  name: { fontSize: 26, fontWeight: "700", color: "#1f8a5c", marginBottom: 12 },
  detail: { fontSize: 16, color: "#2d1050", marginBottom: 8 },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
    marginTop: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonRemove: { backgroundColor: "#a0a0a0" },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
});

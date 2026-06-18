/*
  --- SCREEN: FavoritesScreen ---
  Displays all saved favorite restaurants from the Redux store.

  --- useSelector ---
  We use useSelector here to read the favorites array from the store.
  Whenever a favorite is added or removed, this component automatically
  re-renders with the updated list.

  --- useDispatch ---
  We use useDispatch to allow removing favorites directly from this screen.
*/

import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";

export default function FavoritesScreen({ navigation }) {
  // useSelector: read favorites from the Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // useDispatch: get dispatch to send removeFavorite actions
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites saved yet.</Text>
          <Text style={styles.emptySubtext}>
            Browse restaurants and tap ❤️ to save them here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>❤️ My Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetails", { restaurant: item })
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>
                ⭐ Health Score: {item.healthyScore}/10
              </Text>
              <Text style={styles.detail}>
                🥗 {item.recommendedMeal} · 🔥 {item.calories} cal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeFavorite({ id: item.id }))}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5b2d8e",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: { padding: 20 },
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
  name: { fontSize: 18, fontWeight: "700", color: "#1f8a5c", marginBottom: 6 },
  detail: { fontSize: 14, color: "#2d1050", marginBottom: 3 },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  removeText: { color: "#ffffff", fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  emptyText: { fontSize: 18, fontWeight: "700", color: "#5b2d8e" },
  emptySubtext: { fontSize: 14, color: "#666", marginTop: 8, textAlign: "center" },
});

/*
  --- SCREEN: FavoritesScreen ---
  Displays favorites fetched from the Better Choices API (MongoDB).
  Favorites sync across web and mobile for the same user account.
*/

import { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites, removeFavoriteAPI } from "../store/favoritesSlice";

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state.favorites);

  // Fetch favorites from the API on mount
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5b2d8e" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptySubtext}>
            Go to Restaurants or Nutrition Lookup and save some!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>⭐ My Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id || item.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            {item.restaurant && (
              <Text style={styles.detail}>🏪 {item.restaurant}</Text>
            )}
            {item.calories !== undefined && (
              <Text style={styles.detail}>🔥 {item.calories} calories</Text>
            )}
            {item.healthyScore !== undefined && (
              <Text style={styles.detail}>⭐ Score: {item.healthyScore}/10</Text>
            )}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeFavoriteAPI(item._id))}
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
  name: { fontSize: 17, fontWeight: "700", color: "#1f8a5c", marginBottom: 6 },
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

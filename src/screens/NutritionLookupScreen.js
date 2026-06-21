/*
  --- SCREEN: NutritionLookupScreen ---
  Searches USDA FoodData Central API matching the web application.
  Shows up to 5 results with save-to-favorites on each.

  --- Alerts ---
  Alert.alert() for empty search, no results, and API errors.

  --- Animations ---
  Animated.timing fades in results when data loads.

  --- Gestures ---
  PanResponder detects left swipe to clear all results.
*/

import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteAPI } from "../store/favoritesSlice";

const API_KEY = "DEMO_KEY";
const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export default function NutritionLookupScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 20,
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < -100) {
          fadeAnim.setValue(0);
          setResults([]);
        }
      },
    })
  ).current;

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert("Empty Search", "Please enter a food name to search.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query.trim())}&pageSize=5`
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      if (!data.foods || data.foods.length === 0) {
        Alert.alert("Not Found", `No results found for "${query.trim()}".`);
        setLoading(false);
        return;
      }

      const parsed = data.foods.map((food) => {
        const getNutrient = (name) => {
          const n = food.foodNutrients.find((item) =>
            item.nutrientName?.includes(name)
          );
          return n ? Math.round(n.value) : 0;
        };

        return {
          name: food.description,
          calories: getNutrient("Energy"),
          protein: getNutrient("Protein"),
          carbs: getNutrient("Carbohydrate"),
          fat: getNutrient("Total lipid"),
        };
      });

      setResults(parsed);
      fadeIn();
    } catch {
      Alert.alert("Error", "Failed to fetch nutrition data. Please try again.");
    }

    setLoading(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    fadeAnim.setValue(0);
  };

  const isFavorite = (name) => favorites.some((f) => f.name === name);

  const handleSave = (food) => {
    dispatch(
      addFavoriteAPI({
        name: food.name,
        calories: food.calories,
      })
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>🔍 Nutrition Lookup</Text>
      <Text style={styles.subtitle}>
        Search the USDA database for nutritional information.
      </Text>

      {/* Search form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="e.g., grilled chicken breast"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSearch}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              {loading ? "Searching..." : "Search"}
            </Text>
          </TouchableOpacity>
          {results.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results with fade-in and swipe-to-clear */}
      {results.length > 0 && (
        <Animated.View style={{ opacity: fadeAnim }} {...panResponder.panHandlers}>
          <Text style={styles.resultsTitle}>Results</Text>
          {results.map((food, index) => (
            <View key={index} style={styles.resultCard}>
              <Text style={styles.resultName}>{food.name}</Text>
              <View style={styles.nutrientGrid}>
                <Text style={styles.nutrient}>🔥 {food.calories} cal</Text>
                <Text style={styles.nutrient}>💪 {food.protein}g protein</Text>
                <Text style={styles.nutrient}>🍞 {food.carbs}g carbs</Text>
                <Text style={styles.nutrient}>🧈 {food.fat}g fat</Text>
              </View>
              <TouchableOpacity
                style={[styles.saveButton, isFavorite(food.name) && styles.savedButton]}
                onPress={() => handleSave(food)}
                disabled={isFavorite(food.name)}
              >
                <Text style={styles.saveButtonText}>
                  {isFavorite(food.name) ? "✓ Saved" : "♡ Save to Favorites"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.swipeHint}>← Swipe left to clear results</Text>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5b2d8e",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 24 },
  form: { marginBottom: 24 },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e4d8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2d1050",
    marginBottom: 12,
  },
  buttonRow: { flexDirection: "row", gap: 12 },
  button: {
    flex: 1,
    backgroundColor: "#5b2d8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  clearButton: {
    backgroundColor: "#e4d8f0",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButtonText: { color: "#5b2d8e", fontWeight: "700", fontSize: 16 },
  resultsTitle: { fontSize: 18, fontWeight: "700", color: "#5b2d8e", marginBottom: 12 },
  resultCard: {
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
  resultName: { fontSize: 16, fontWeight: "700", color: "#1f8a5c", marginBottom: 10 },
  nutrientGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  nutrient: { width: "50%", fontSize: 14, color: "#2d1050", marginBottom: 4 },
  saveButton: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  savedButton: { backgroundColor: "#a0a0a0" },
  saveButtonText: { color: "#ffffff", fontWeight: "600", fontSize: 14 },
  swipeHint: { fontSize: 12, color: "#999", textAlign: "center", marginTop: 8 },
});

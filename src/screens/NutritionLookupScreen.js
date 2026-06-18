/*
  --- SCREEN: NutritionLookupScreen ---
  Allows users to search for food items using the USDA FoodData Central API.

  --- Alerts ---
  Alert.alert() displays a native dialog box on the device.
  Used here for: empty search field, food not found, and API errors.
  Alert is non-blocking and provides a simple way to communicate with users.

  --- Animations ---
  React Native's Animated API creates smooth visual transitions.
  We use Animated.Value to track opacity (0 = invisible, 1 = visible).
  Animated.timing() transitions the value over a duration with easing.
  The result card fades in when nutrition data loads.

  --- Gestures ---
  We use PanResponder to detect swipe gestures on the result card.
  PanResponder listens for touch start, move, and release events.
  When the user swipes left (dx < -100), we clear the result card.

  --- API Requests / Async-Await ---
  fetch() makes HTTP requests to external APIs.
  async/await lets us write asynchronous code that reads like synchronous code.
  await pauses execution until the Promise resolves, keeping code readable.
  We wrap API calls in try/catch to handle network errors gracefully.
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

// USDA FoodData Central API key and endpoint
const API_KEY = "DEMO_KEY";
const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export default function NutritionLookupScreen() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Animated value for fade-in effect (0 = hidden, 1 = fully visible)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // PanResponder: detects horizontal swipe gestures on the result card
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        // If user swipes left more than 100px, clear the result
        if (gestureState.dx < -100) {
          fadeAnim.setValue(0);
          setResult(null);
        }
      },
    })
  ).current;

  // Fade in the result card
  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Search the USDA API for nutrition data
  const handleSearch = async () => {
    // Alert: empty search field validation
    if (!query.trim()) {
      Alert.alert("Empty Search", "Please enter a food name to search.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // async/await: fetch pauses here until the API responds
      const response = await fetch(
        `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query.trim())}&pageSize=1`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      if (!data.foods || data.foods.length === 0) {
        // Alert: food not found
        Alert.alert("Not Found", `No results found for "${query.trim()}".`);
        setLoading(false);
        return;
      }

      const food = data.foods[0];
      const nutrients = food.foodNutrients || [];

      // Extract specific nutrients by name
      const getNutrient = (name) => {
        const n = nutrients.find((item) => item.nutrientName?.includes(name));
        return n ? Math.round(n.value) : 0;
      };

      setResult({
        name: food.description,
        calories: getNutrient("Energy"),
        protein: getNutrient("Protein"),
        carbs: getNutrient("Carbohydrate"),
        fat: getNutrient("Total lipid"),
      });

      // Trigger fade-in animation for the result card
      fadeIn();
    } catch (error) {
      // Alert: API request failure
      Alert.alert("Error", "Failed to fetch nutrition data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>🔍 Nutrition Lookup</Text>
      <Text style={styles.subtitle}>
        Search for any food to view its nutrition info.
      </Text>

      {/* Search form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter food name (e.g. Turkey Sandwich)"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {loading ? "Searching..." : "Search"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Result card with fade-in animation and swipe-to-clear gesture */}
      {result && (
        <Animated.View
          style={[styles.resultCard, { opacity: fadeAnim }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.resultName}>{result.name}</Text>
          <View style={styles.nutrientRow}>
            <Text style={styles.nutrientLabel}>🔥 Calories</Text>
            <Text style={styles.nutrientValue}>{result.calories} kcal</Text>
          </View>
          <View style={styles.nutrientRow}>
            <Text style={styles.nutrientLabel}>💪 Protein</Text>
            <Text style={styles.nutrientValue}>{result.protein} g</Text>
          </View>
          <View style={styles.nutrientRow}>
            <Text style={styles.nutrientLabel}>🍞 Carbohydrates</Text>
            <Text style={styles.nutrientValue}>{result.carbs} g</Text>
          </View>
          <View style={styles.nutrientRow}>
            <Text style={styles.nutrientLabel}>🧈 Fat</Text>
            <Text style={styles.nutrientValue}>{result.fat} g</Text>
          </View>
          <Text style={styles.swipeHint}>← Swipe left to clear</Text>
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
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
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
  button: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    shadowColor: "#3c0e5a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  resultName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f8a5c",
    marginBottom: 16,
    textTransform: "capitalize",
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0e8f7",
  },
  nutrientLabel: { fontSize: 16, color: "#2d1050" },
  nutrientValue: { fontSize: 16, fontWeight: "600", color: "#5b2d8e" },
  swipeHint: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 12,
  },
});

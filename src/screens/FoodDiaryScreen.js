/*
  --- SCREEN: FoodDiaryScreen ---
  Allows users to log meals and track daily calories.

  --- TextInput ---
  TextInput is React Native's form input component (like <input> in web).
  It accepts user text and fires onChangeText when the value changes.
  keyboardType="numeric" shows a number pad for calorie input.

  --- Controlled Inputs ---
  A controlled input is one whose value is driven by component state.
  We store the input value in useState and update it via onChangeText.
  This gives us full control over the value for validation and clearing.

  --- useState ---
  useState is a React hook that adds local state to a function component.
  It returns [currentValue, setterFunction]. Each call to the setter
  triggers a re-render with the new value.

  --- Form Validation ---
  Before saving, we check that no fields are empty and that calories
  is a valid number. If validation fails, we show an error message.

  --- FlatList ---
  FlatList efficiently renders a scrollable list of meal entries.
  It only renders visible items, making it performant for long lists.
*/

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMeal, removeMeal } from "../store/foodDiarySlice";

export default function FoodDiaryScreen() {
  // useState: local state for each form field (controlled inputs)
  const [mealName, setMealName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const entries = useSelector((state) => state.foodDiary.entries);
  const totalCalories = useSelector((state) => state.foodDiary.totalCalories);

  const handleSaveMeal = () => {
    // Form Validation: check for empty fields
    if (!mealName.trim() || !foodItem.trim() || !calories.trim()) {
      setError("All fields are required.");
      return;
    }

    // Form Validation: calories must be a valid number
    const cal = Number(calories);
    if (isNaN(cal) || cal <= 0) {
      setError("Calories must be a valid number.");
      return;
    }

    // Dispatch addMeal action to Redux store
    dispatch(
      addMeal({
        id: Date.now().toString(),
        mealName: mealName.trim(),
        foodItem: foodItem.trim(),
        calories: cal,
      })
    );

    // Clear form and error
    setMealName("");
    setFoodItem("");
    setCalories("");
    setError("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>🍽️ Food Diary</Text>

            {/* Meal entry form */}
            <View style={styles.form}>
              {/* TextInput: controlled by mealName state */}
              <TextInput
                style={styles.input}
                placeholder="Meal Name (e.g. Breakfast)"
                placeholderTextColor="#999"
                value={mealName}
                onChangeText={setMealName}
              />
              {/* TextInput: controlled by foodItem state */}
              <TextInput
                style={styles.input}
                placeholder="Food Item (e.g. Oatmeal)"
                placeholderTextColor="#999"
                value={foodItem}
                onChangeText={setFoodItem}
              />
              {/* TextInput: numeric keyboard for calories */}
              <TextInput
                style={styles.input}
                placeholder="Calories (e.g. 300)"
                placeholderTextColor="#999"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
              />

              {/* Validation error display */}
              {error ? <Text style={styles.error}>{error}</Text> : null}

              {/* Save Meal button */}
              <TouchableOpacity style={styles.button} onPress={handleSaveMeal}>
                <Text style={styles.buttonText}>Save Meal</Text>
              </TouchableOpacity>
            </View>

            {/* Daily Total Calories */}
            <View style={styles.totalCard}>
              <Text style={styles.totalText}>
                🔥 Daily Total: {totalCalories} calories
              </Text>
            </View>

            {entries.length > 0 && (
              <Text style={styles.sectionTitle}>Logged Meals</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardMeal}>{item.mealName}</Text>
              <Text style={styles.cardDetail}>🥗 {item.foodItem}</Text>
              <Text style={styles.cardDetail}>🔥 {item.calories} calories</Text>
            </View>
            {/* Delete Meal button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => dispatch(removeMeal({ id: item.id }))}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No meals logged yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  list: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5b2d8e",
    textAlign: "center",
    marginBottom: 16,
  },
  form: { marginBottom: 20 },
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
  error: { color: "#e74c3c", fontSize: 14, marginBottom: 8 },
  button: {
    backgroundColor: "#5b2d8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  totalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    alignItems: "center",
    marginBottom: 20,
  },
  totalText: { fontSize: 18, fontWeight: "700", color: "#1f8a5c" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5b2d8e",
    marginBottom: 12,
  },
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
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteText: { color: "#ffffff", fontWeight: "600" },
  emptyText: { textAlign: "center", color: "#999", fontSize: 14, marginTop: 12 },
});

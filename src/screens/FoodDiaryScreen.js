/*
  --- SCREEN: FoodDiaryScreen ---
  A persistent Food Diary with calendar view and AsyncStorage.

  --- AsyncStorage ---
  On mount, we load saved meals from AsyncStorage into Redux.
  This ensures data persists between app sessions without a backend.

  --- Data Persistence ---
  Meals are saved to AsyncStorage automatically when added or removed
  (handled in the foodDiarySlice). On app start, loadMealsFromStorage
  reads the data and dispatches loadMeals to populate Redux state.

  --- Redux Integration ---
  We use useSelector to read entries and useDispatch to add/remove meals.
  The slice handles both Redux state updates and AsyncStorage persistence.

  --- Calendar Logic ---
  Each meal has a date field. The calendar highlights days with entries.
  Users can tap a day to filter and view only that day's meals.
  Navigating months lets users review historical entries.
*/

import { useState, useEffect } from "react";
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
import { addMeal, removeMeal, loadMeals, loadMealsFromStorage } from "../store/foodDiarySlice";
import DiaryCalendar from "../components/DiaryCalendar";
import MealCard from "../components/MealCard";

// Get today's date as YYYY-MM-DD
const getToday = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

export default function FoodDiaryScreen() {
  const [mealName, setMealName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Quick Calorie Lookup state
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [lookupLoading, setLookupLoading] = useState(false);

  const dispatch = useDispatch();
  const allEntries = useSelector((state) => state.foodDiary.entries);

  // Load saved meals from AsyncStorage on mount
  useEffect(() => {
    const load = async () => {
      const saved = await loadMealsFromStorage();
      if (saved.length > 0) {
        dispatch(loadMeals(saved));
      }
    };
    load();
  }, [dispatch]);

  // Filter entries for the selected date
  const dailyEntries = allEntries.filter((e) => e.date === selectedDate);
  const dailyCalories = dailyEntries.reduce((sum, e) => sum + e.calories, 0);

  // Get unique dates that have entries (for calendar highlighting)
  const datesWithEntries = [...new Set(allEntries.map((e) => e.date))];

  // Calendar navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSaveMeal = () => {
    if (!mealName.trim() || !foodItem.trim() || !calories.trim()) {
      setError("All fields are required.");
      return;
    }

    const cal = Number(calories);
    if (isNaN(cal) || cal <= 0) {
      setError("Calories must be a valid number.");
      return;
    }

    dispatch(
      addMeal({
        id: Date.now().toString(),
        mealName: mealName.trim(),
        foodItem: foodItem.trim(),
        calories: cal,
        date: selectedDate,
      })
    );

    setMealName("");
    setFoodItem("");
    setCalories("");
    setError("");
  };

  // Quick Calorie Lookup using USDA API
  const handleLookup = async () => {
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    setLookupResults([]);
    try {
      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${encodeURIComponent(lookupQuery)}&pageSize=5`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.foods && data.foods.length > 0) {
        const results = data.foods.map((food) => {
          const energy = food.foodNutrients.find((n) => n.nutrientName === "Energy");
          return { name: food.description, calories: energy ? Math.round(energy.value) : 0 };
        });
        setLookupResults(results);
      }
    } catch {}
    setLookupLoading(false);
  };

  const handleUseResult = (result) => {
    setFoodItem(result.name);
    setCalories(String(result.calories));
    setLookupResults([]);
    setLookupQuery("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dailyEntries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>🍽️ Food Diary</Text>

            {/* Calendar View */}
            <DiaryCalendar
              currentMonth={currentMonth}
              currentYear={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onSelectDate={setSelectedDate}
              selectedDate={selectedDate}
              datesWithEntries={datesWithEntries}
            />

            {/* Selected date display */}
            <Text style={styles.dateLabel}>📅 {selectedDate}</Text>

            {/* Meal entry form */}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Meal Name (e.g. Breakfast)"
                placeholderTextColor="#999"
                value={mealName}
                onChangeText={setMealName}
              />
              <TextInput
                style={styles.input}
                placeholder="Food Item (e.g. Oatmeal)"
                placeholderTextColor="#999"
                value={foodItem}
                onChangeText={setFoodItem}
              />
              <TextInput
                style={styles.input}
                placeholder="Calories (e.g. 300)"
                placeholderTextColor="#999"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleSaveMeal}>
                <Text style={styles.buttonText}>Save Meal</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Calorie Lookup */}
            <View style={styles.lookupCard}>
              <Text style={styles.lookupTitle}>🔍 Quick Calorie Lookup</Text>
              <TextInput
                style={styles.input}
                placeholder="Search a food..."
                placeholderTextColor="#999"
                value={lookupQuery}
                onChangeText={setLookupQuery}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleLookup}
                disabled={lookupLoading}
              >
                <Text style={styles.buttonText}>
                  {lookupLoading ? "Searching..." : "Look Up"}
                </Text>
              </TouchableOpacity>
              {lookupResults.map((result, index) => (
                <View key={index} style={styles.lookupResult}>
                  <View style={styles.lookupInfo}>
                    <Text style={styles.lookupName} numberOfLines={1}>{result.name}</Text>
                    <Text style={styles.lookupCal}>{result.calories} cal</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.useButton}
                    onPress={() => handleUseResult(result)}
                  >
                    <Text style={styles.useButtonText}>Use</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Daily Total Calories */}
            <View style={styles.totalCard}>
              <Text style={styles.totalText}>
                🔥 Daily Total: {dailyCalories} calories
              </Text>
            </View>

            {dailyEntries.length > 0 && (
              <Text style={styles.sectionTitle}>Meals on {selectedDate}</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <MealCard
            item={item}
            onDelete={() => dispatch(removeMeal({ id: item.id }))}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No meals logged for this date.</Text>
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
  dateLabel: {
    fontSize: 16,
    fontWeight: "600",
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

  emptyText: { textAlign: "center", color: "#999", fontSize: 14, marginTop: 12 },
  lookupCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    marginBottom: 20,
  },
  lookupTitle: { fontSize: 16, fontWeight: "700", color: "#5b2d8e", marginBottom: 12 },
  lookupResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0e8f7",
    marginTop: 8,
  },
  lookupInfo: { flex: 1, marginRight: 10 },
  lookupName: { fontSize: 13, color: "#2d1050" },
  lookupCal: { fontSize: 12, color: "#666" },
  useButton: {
    backgroundColor: "#1f8a5c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  useButtonText: { color: "#ffffff", fontWeight: "600", fontSize: 12 },
});

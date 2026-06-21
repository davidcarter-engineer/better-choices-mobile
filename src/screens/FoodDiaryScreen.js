/*
  --- SCREEN: FoodDiaryScreen ---
  Food Diary backed by the Better Choices API (MongoDB).
  Entries sync between web and mobile for the same user account.
*/

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchDiaryEntries, addMealAPI, removeMealAPI, setSelectedDate } from "../store/foodDiarySlice";
import DiaryCalendar from "../components/DiaryCalendar";

const API_KEY = "DEMO_KEY";
const USDA_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export default function FoodDiaryScreen() {
  const [mealName, setMealName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Quick Calorie Lookup state
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [lookupLoading, setLookupLoading] = useState(false);

  const dispatch = useDispatch();
  const { entries, selectedDate, loading } = useSelector((state) => state.foodDiary);

  // Fetch all diary entries from the API on mount
  useEffect(() => {
    dispatch(fetchDiaryEntries());
  }, [dispatch]);

  // Filter entries for the selected date
  const dailyEntries = entries.filter((e) => e.date === selectedDate);
  const dailyCalories = dailyEntries.reduce((sum, e) => sum + e.calories, 0);

  // Get dates that have entries (for calendar highlighting)
  const datesWithEntries = [...new Set(entries.map((e) => e.date))];

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
      addMealAPI({
        date: selectedDate,
        mealName: mealName.trim(),
        foodItem: foodItem.trim(),
        calories: cal,
      })
    );

    setMealName("");
    setFoodItem("");
    setCalories("");
    setError("");
  };

  // Quick Calorie Lookup
  const handleLookup = async () => {
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    setLookupResults([]);
    try {
      const url = `${USDA_URL}?api_key=${API_KEY}&query=${encodeURIComponent(lookupQuery)}&pageSize=5`;
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>🍽️ Food Diary</Text>

            {loading && <ActivityIndicator color="#5b2d8e" style={{ marginBottom: 12 }} />}

            {/* Calendar View */}
            <DiaryCalendar
              currentMonth={currentMonth}
              currentYear={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onSelectDate={(date) => dispatch(setSelectedDate(date))}
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
          <View style={styles.card}>
            <Text style={styles.cardMeal}>{item.mealName}</Text>
            <Text style={styles.cardDetail}>🥗 {item.foodItem}</Text>
            <Text style={styles.cardDetail}>🔥 {item.calories} calories</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => dispatch(removeMealAPI(item._id))}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
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

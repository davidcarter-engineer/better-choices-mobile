/*
  --- SCREEN: HomeScreen ---
  The landing screen preserving the original Better Choices branding.
  Navigation is handled by the hamburger menu in the Header.
*/

import { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";
import restaurants from "../data/restaurants";

export default function HomeScreen({ navigation }) {
  const [healthyPick, setHealthyPick] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setHealthyPick(restaurants[randomIndex]);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header with hamburger menu for navigation */}
      <Header navigation={navigation} />

      <View style={styles.section}>
        <Text style={styles.description}>
          Many people lead busy lives and do not always have the luxury of
          cooking meals at home. Better Choices helps users make healthier
          decisions when fast food is the most practical option.
        </Text>
      </View>

      {/* Healthy Pick of the Day */}
      {healthyPick && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌿 Healthy Pick of the Day</Text>
          <View style={styles.pickCard}>
            <Text style={styles.pickName}>{healthyPick.name}</Text>
            <Text style={styles.pickDetail}>
              🥗 Try: {healthyPick.recommendedMeal}
            </Text>
            <Text style={styles.pickDetail}>
              🔥 {healthyPick.calories} calories
            </Text>
            <Text style={styles.pickDetail}>
              ⭐ Healthy Score: {healthyPick.healthyScore}/10
            </Text>
          </View>
        </View>
      )}

      {/* Featured Restaurants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            onPress={() =>
              navigation.navigate("RestaurantDetails", { restaurant })
            }
          >
            <RestaurantCard
              name={restaurant.name}
              healthyScore={restaurant.healthyScore}
              recommendedMeal={restaurant.recommendedMeal}
              calories={restaurant.calories}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f4fc" },
  section: { paddingHorizontal: 20, paddingTop: 24 },
  description: { fontSize: 16, lineHeight: 26, color: "#2d1050" },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5b2d8e",
    marginBottom: 12,
  },
  pickCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    shadowColor: "#3c0e5a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  pickName: { fontSize: 20, fontWeight: "700", color: "#1f8a5c", marginBottom: 8 },
  pickDetail: { fontSize: 15, color: "#2d1050", marginBottom: 4 },

});

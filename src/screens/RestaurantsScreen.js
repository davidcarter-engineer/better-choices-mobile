/*
  --- SCREEN: RestaurantsScreen ---
  Displays all restaurants using FlatList.

  --- FlatList ---
  FlatList is optimized for rendering long scrollable lists.
  Unlike ScrollView + .map(), FlatList only renders items currently
  visible on screen, improving performance for large datasets.
  It requires: data (array), renderItem (function), and keyExtractor.
*/

import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text } from "react-native";
import RestaurantCard from "../components/RestaurantCard";
import restaurants from "../data/restaurants";

export default function RestaurantsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetails", { restaurant: item })
            }
          >
            <RestaurantCard
              name={item.name}
              healthyScore={item.healthyScore}
              recommendedMeal={item.recommendedMeal}
              calories={item.calories}
            />
          </TouchableOpacity>
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
});

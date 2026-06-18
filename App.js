/*
  --- App.js ---
  Root of the Better Choices Mobile application.

  --- Redux Provider ---
  The Provider component from react-redux wraps the entire app and makes
  the Redux store available to all nested components. Any component can
  then use useSelector/useDispatch hooks to interact with the store.

  --- React Navigation ---
  React Navigation provides screen-to-screen navigation for React Native.
  - NavigationContainer: wraps the app and manages navigation state.
  - createNativeStackNavigator: creates a stack-based navigation where
    screens are pushed/popped like a stack of cards.

  Navigation flow:
    Home → Restaurants → RestaurantDetails
    Home → Favorites → RestaurantDetails
*/

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./src/store/store";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantsScreen from "./src/screens/RestaurantsScreen";
import RestaurantDetailsScreen from "./src/screens/RestaurantDetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Provider gives every component access to the Redux store
    <Provider store={store}>
      {/* NavigationContainer manages navigation tree and state */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#5b2d8e" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "700" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Restaurants"
            component={RestaurantsScreen}
            options={{ title: "All Restaurants" }}
          />
          <Stack.Screen
            name="RestaurantDetails"
            component={RestaurantDetailsScreen}
            options={{ title: "Details" }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: "My Favorites" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

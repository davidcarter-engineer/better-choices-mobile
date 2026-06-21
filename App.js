/*
  --- App.js ---
  Root of the Better Choices Mobile application.

  --- AuthProvider ---
  Wraps the app to provide authentication state (user, token, login,
  register, logout, updateProfile) to all components via React Context.

  --- Redux Provider ---
  The Provider component from react-redux wraps the entire app and makes
  the Redux store available to all nested components.

  --- React Navigation ---
  React Navigation provides screen-to-screen navigation for React Native.
*/

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./src/store/store";
import { AuthProvider } from "./src/context/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantsScreen from "./src/screens/RestaurantsScreen";
import RestaurantDetailsScreen from "./src/screens/RestaurantDetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import FoodDiaryScreen from "./src/screens/FoodDiaryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import NutritionLookupScreen from "./src/screens/NutritionLookupScreen";
import ContactScreen from "./src/screens/ContactScreen";
import AboutScreen from "./src/screens/AboutScreen";
import DisclaimerScreen from "./src/screens/DisclaimerScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
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
            <Stack.Screen
              name="FoodDiary"
              component={FoodDiaryScreen}
              options={{ title: "Food Diary" }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Settings" }}
            />
            <Stack.Screen
              name="NutritionLookup"
              component={NutritionLookupScreen}
              options={{ title: "Nutrition Lookup" }}
            />
            <Stack.Screen
              name="Contact"
              component={ContactScreen}
              options={{ title: "Contact Us" }}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ title: "About" }}
            />
            <Stack.Screen
              name="Disclaimer"
              component={DisclaimerScreen}
              options={{ title: "Disclaimer" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "My Profile" }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: "Forgot Password" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}

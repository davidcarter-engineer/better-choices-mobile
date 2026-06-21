/*
  --- COMPONENT: HamburgerMenu ---
  A mobile-friendly navigation menu triggered by a hamburger icon.

  --- Touch Alignment Fix ---
  The TouchableOpacity itself is the 44x44 container with the icon centered.
  No wrapper View is used — this eliminates any offset between the visible
  icon and the tappable area. The Modal renders in a portal above the app
  and does not affect the button's position or touch target.

  --- Debug Colors ---
  Temporary backgroundColor: "red" is applied to the hamburger button
  so the touch area is visible. Remove after confirming alignment.
*/

import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { fetchFavorites, clearFavorites } from "../store/favoritesSlice";

export default function HamburgerMenu({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  const handleNavigate = (screen) => {
    setMenuVisible(false);
    setTimeout(() => navigation.navigate(screen), 150);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
    dispatch(clearFavorites());
    setTimeout(() => navigation.navigate("Home"), 150);
  };

  return (
    <>
      {/* The TouchableOpacity IS the 44x44 container — icon is centered inside */}
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => setMenuVisible(true)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.6}
      >
        <Ionicons name="menu" size={28} color="#ffffff" />
      </TouchableOpacity>

      {/* Modal renders above everything — does not affect button layout */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <SafeAreaView style={styles.overlay}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>Better Choices</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("Home")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>🏠 Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("Restaurants")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>🍽️ Restaurants</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("Favorites")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>❤️ Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("FoodDiary")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>📓 Food Diary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("NutritionLookup")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>🔍 Nutrition Lookup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("Contact")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>📬 Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("About")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>ℹ️ About</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("Disclaimer")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>⚠️ Disclaimer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("Settings")}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>⚙️ Settings</Text>
            </TouchableOpacity>

            {/* Auth navigation */}
            {user ? (
              <>
                <View style={styles.welcomeRow}>
                  {user.profilePic ? (
                    <Image source={{ uri: user.profilePic }} style={styles.navPic} />
                  ) : null}
                  <Text style={styles.welcomeText}>Welcome, {user.username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleNavigate("Profile")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemText}>👤 Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuItem, styles.logoutItem]}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemText}>🚪 Sign Out</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleNavigate("Login")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemText}>🔐 Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleNavigate("Register")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemText}>📝 Sign Up</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#5b2d8e",
    borderRadius: 16,
    padding: 32,
    width: "80%",
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 24,
  },
  menuItem: {
    backgroundColor: "#7b4dab",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  menuItemText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#e4d8f0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#5b2d8e",
    fontSize: 16,
    fontWeight: "700",
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  welcomeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  navPic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logoutItem: {
    backgroundColor: "#9b3a3a",
  },
});

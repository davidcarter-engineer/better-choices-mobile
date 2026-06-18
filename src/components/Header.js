/*
  --- COMPONENT: Header ---
  Displays the app logo, title, and welcome message.

  --- React Native Components ---
  View: The building block for layouts (like <div> in web).
  Text: Displays text content (like <p> or <h1> in web).
  Image: Displays images (like <img> in web).
         Requires a source via require() for local files.

  --- StyleSheet ---
  StyleSheet.create() defines styles in React Native.
  It uses JavaScript objects instead of CSS files.
  Properties are camelCase (e.g., fontSize instead of font-size).
*/

import { View, Text, Image, StyleSheet } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/better-choices-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Better Choices</Text>
      <Text style={styles.subtitle}>
        Helping you make healthier decisions one meal at a time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "#5b2d8e",
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: -35,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#dff3ea",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default Header;

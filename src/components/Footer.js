/*
  --- COMPONENT: Footer ---
  A simple footer displayed at the bottom of the scroll view.

  --- View ---
  View is the most fundamental component in React Native.
  It maps to the native view on each platform (UIView on iOS,
  android.view on Android). Think of it like <div>.
*/

import { View, Text, StyleSheet } from "react-native";

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Better Choices</Text>
      <Text style={styles.subtext}>Making healthier decisions easier.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#5b2d8e",
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  subtext: {
    color: "#dff3ea",
    fontSize: 12,
    marginTop: 4,
  },
});

export default Footer;

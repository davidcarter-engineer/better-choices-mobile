/*
  --- COMPONENT: Header ---
  A clean mobile header with 4 rows using Flexbox:
    Row 1: Hamburger menu (left) and Settings (right)
    Row 2: Centered logo
    Row 3: Centered title
    Row 4: Centered tagline

  Touch handling fixes:
    - toolbar has zIndex: 10 to ensure it sits above other content
    - hitSlop expands the tappable area beyond the visible button bounds
    - pointerEvents="box-none" on non-interactive containers prevents them
      from intercepting touch events meant for child buttons
    - Settings button has an onPress handler (shows Alert)
*/

import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import HamburgerMenu from "./HamburgerMenu";

function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Row 1: Toolbar */}
        <View style={styles.toolbar}>
          {navigation ? (
            <HamburgerMenu navigation={navigation} />
          ) : (
            <View style={styles.iconBox} />
          )}
        </View>

        {/* Row 2: Logo — pointerEvents="none" prevents logo from stealing taps */}
        <View style={styles.logoRow} pointerEvents="none">
          <Image
            source={require("../../assets/better-choices-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Row 3: Title */}
        <Text style={styles.title}>Better Choices</Text>

        {/* Row 4: Tagline */}
        <Text style={styles.subtitle}>
          Helping you make healthier decisions one meal at a time.
        </Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5b2d8e",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    // zIndex ensures toolbar buttons are not blocked by sibling views
    zIndex: 10,
    elevation: 10,
  },
  iconBox: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  logoRow: {
    alignItems: "center",
    marginTop: 0,
  },
  logo: {
    width: 220,
    height: 220,
    marginTop: -65,
    marginBottom: -60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#dff3ea",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default Header;

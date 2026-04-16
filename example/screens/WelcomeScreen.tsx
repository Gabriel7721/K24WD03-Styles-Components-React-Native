import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/images/background.jpg")}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo-red.png")}
          style={styles.logo}
        />
        <Text style={{ fontSize: 18, color: "gray"}}>Sell What You Don't Need</Text>
      </View>

      <AppButton
        title="Login"
        onPress={() => console.log("Tap!")}
        color={colors.primary}
      />
      <AppButton title="Register" onPress={() => console.log("Tap!")} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});

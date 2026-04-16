import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

interface Props {
  title: string;
  onPress: () => void;
  color?: string;
}

export default function AppButton({
  title,
  onPress,
  color = colors.secondary,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginTop: 10,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 18,
    color: colors.white,
  },
});

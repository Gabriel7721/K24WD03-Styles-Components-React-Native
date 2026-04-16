import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

interface Props {
  title: string;
  subTitle?: string;
  image: ImageSourcePropType;
}

export default function Card({ image, title, subTitle }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.detailCard}>
        <AppText style={styles.title} children={title} />
        <AppText style={styles.subTitle} children={subTitle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailCard: { padding: 20 },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  title: { marginBottom: 8 },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  image: { height: 200, width: "100%" },
});

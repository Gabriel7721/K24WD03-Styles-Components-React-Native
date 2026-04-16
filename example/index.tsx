import React from "react";
import { View } from "react-native";
import Card from "./components/Card";

export default function App() {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#eaeaea",
      }}>
      <Card
        title={"Red jack cheap!"}
        image={require("./assets/images/jacket.jpg")}
        subTitle="$ 200"
      />
      <Card
        title={"Couch cheap!"}
        image={require("./assets/images/couch.jpg")}
        subTitle="$ 50"
      />
    </View>
  );
}

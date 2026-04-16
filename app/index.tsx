import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
export default function Index() {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<"/home" | "/login">("/login");

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return;
  // <Redirect href={redirectTo} />;
}

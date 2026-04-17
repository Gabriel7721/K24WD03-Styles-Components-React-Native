import api from "@/src/api/axios";
import { getToken, removeToken } from "@/src/utils/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<"/home" | "/login">("/login");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();

        if (!token) {
          setRedirectTo("/login");
          setLoading(false);
          return;
        }

        await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRedirectTo("/home");
      } catch {
        await removeToken();
        setRedirectTo("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Redirect href={redirectTo} />;
}

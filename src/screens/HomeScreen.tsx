import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../api/axios";
import { getToken, removeToken } from "../utils/auth";

type User = {
  name: string;
  email: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchMe();
  }, []);
  const fetchMe = async () => {
    try {
      const token = await getToken();
      if (!token) {
        // router.replace("/login");
        return;
      }
      const response = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Không thể lấy thông tin user";
        if (
          error.response?.status === 401 ||
          message.toLowerCase().includes("invalid token")
        ) {
          await removeToken();
          Alert.alert("Phiên đăng nhập hết hạn", "Vui lòng đăng nhập lại.");
          //   router.replace("/login");
          return;
        }

        Alert.alert("Lỗi", message);
      } else {
        Alert.alert("Lỗi", "Không thể lấy thông tin user");
      }
    }
  };
  const handleLogout = async () => {
    await removeToken();
    router.replace("/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <Text style={styles.text}>Hello {user?.name || "User"}</Text>
      <Text style={styles.text}>Email: {user?.email || "..."}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 28,
    marginBottom: 16,
  },
  buttonText: { textAlign: "center", color: "#fff", fontWeight: "700" },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
});

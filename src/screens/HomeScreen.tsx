import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
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
    // router.replace("/login");
  };
  return;
}
const styles = StyleSheet.create({});

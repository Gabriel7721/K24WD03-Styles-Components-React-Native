import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet
} from "react-native";
import api from "../api/axios";
import { saveToken } from "../utils/auth";
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;
      await saveToken(token);
      //   router.replace("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Lỗi",
          error.response?.data?.message || "Đăng nhập thất bại",
        );
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định");
      }
    }
  };
  return;
}
const styles = StyleSheet.create({});

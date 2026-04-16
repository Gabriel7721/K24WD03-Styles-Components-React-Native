import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import api from "../api/axios";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/register", { name, email, password });
      Alert.alert("Thành công", "Đăng ký thành công. Hãy đăng nhập.");
      //   router.replace("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert("Lỗi", error.response?.data?.message || "Đăng ký thất bại");
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định");
      }
    }
  };
  return;
}
const styles = StyleSheet.create({});

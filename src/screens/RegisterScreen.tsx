import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
      router.replace("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert("Lỗi", error.response?.data?.message || "Đăng ký thất bại");
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định");
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.link}>Already have account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  link: { textAlign: "center", color: "#2563eb" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: { textAlign: "center", color: "#fff", fontWeight: "700" },
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
});

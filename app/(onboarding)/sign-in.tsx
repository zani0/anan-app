import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Missing Info",
        text2: "Please enter your email and password",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Welcome back!",
      text2: "You're now signed in 🚀",
    });

    setTimeout(() => router.replace("/welcome"), 1500);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#5d198a] px-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[35px] font-caprasimo text-[#D0EE30] text-center mb-2">
          Sign In
        </Text>

        <Text className="text-white font-poppins text-center mb-6">
          Log into your Anansesem account
        </Text>

        <View className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 font-poppins"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          <View className="border border-gray-300 rounded-lg flex-row items-center px-4">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              className="flex-1 py-3 font-poppins"
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#5d198a"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin} className="bg-[#5d198a] py-3 rounded-xl mt-2">
            <Text className="text-white text-center font-poppinsBold">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/(onboarding)/sign-up")}>
            <Text className="text-center text-[#5d198a] font-poppins mt-2 underline">
              Don’t have an account? Create one
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white font-poppins text-center my-6">OR</Text>

        <View className="flex-row justify-center gap-6">
          <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
            <Image source={{ uri: "" }} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
            <Image source={{ uri: "" }} className="w-6 h-6" />
          </TouchableOpacity>
          {Platform.OS === "ios" && (
            <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
              <Image source={{ uri: "" }} className="w-6 h-6" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
}

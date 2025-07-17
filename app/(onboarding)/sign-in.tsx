import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://192.168.100.35:3001/api";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  // Load saved credentials
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");

        if (email && password) {
          setForm({ email, password });
          setRememberMe(true);
        }
      } catch (err) {
        console.error("Failed to load credentials", err);
      }
    };

    loadSaved();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("Sending to:", `${BASE_URL}/login`);
    console.log("Body:", form);

    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Please fill in all the fields 😊",
      });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address",
      });
      return;
    }

    setIsLoading(true); // 🌀 Start loading

    try {
      if (rememberMe) {
        await AsyncStorage.setItem("email", form.email);
        await AsyncStorage.setItem("password", form.password);
      } else {
        await AsyncStorage.multiRemove(["email", "password"]);
      }

      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: data.message || "Check your credentials",
        });
        return;
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      const hasProfiles = data.user.profiles && data.user.profiles.length > 0;
      const destination = hasProfiles
        ? "choose-profile"
        : "create-child-profile";

      await SecureStore.setItemAsync("age_verify_source", destination);

      Toast.show({
        type: "success",
        text1: "Login Successful!",
        text2: "Redirecting to profiles... 💫",
      });

      router.push("/(onboarding)/verify-age");
    } catch (err) {
      console.error("Login error", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong, try again.",
      });
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
    
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#5d198a] px-6">
      {/* Top Right Spiderweb */}
      <Image
        source={require("@/assets/images/spider-web-1.png")}
        className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        resizeMode="cover"
      />

      {/* Bottom Left Spiderweb */}
      <Image
        source={require("@/assets/images/spider-web-2.png")}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-[35px] font-caprasimo text-[#D0EE30] text-center mb-2">
          Sign In
        </Text>

        {/* Subtitle */}
        <Text className="text-white font-poppins text-center mb-6">
          Enter your account details to log in and continue setting up parental
          controls.
        </Text>

        {/* Form Card */}
        <View className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 font-poppins mb-4"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          {/* Password Field with Icon */}
          <View className="border border-gray-300 rounded-lg flex-row items-center px-4 mb-4">
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

          {/* Checkbox */}
          <View className="flex-row items-center mb-2 mt-1">
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? "#5d198a" : undefined}
            />
            <Text className="ml-2 text-sm font-poppins text-gray-700">
              Remember me
            </Text>
          </View>

          {/* Proceed */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className={`py-3 rounded-xl mt-3 mb-6 ${isLoading ? "bg-[#D0EE30]/70" : "bg-[#D0EE30]"}`}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#5d198a" />
            ) : (
              <Text className="text-[#5d198a] text-center font-poppinsBold text-[18px]">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Create Account */}
          <TouchableOpacity
            onPress={() => router.push("/(onboarding)/sign-up")}
          >
            <Text className="text-center text-[#5d198a] font-poppins mt-2 underline">
              Don’t have an account? Create one
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <Text className="text-white font-poppins text-center my-6">OR</Text>

        {/* Social Buttons Row */}
        <View className="flex-row justify-center gap-6">
          <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
            <Image
              source={require("@/assets/images/facebook.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
            <Image
              source={require("@/assets/images/google.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          {Platform.OS === "ios" && (
            <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
              <Image
                source={require("@/assets/images/apple.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Toast Popup */}
      <Toast />
    </View>
  );
}

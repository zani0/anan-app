import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
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

  const handleSubmit = () => {
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

    Toast.show({
      type: "success",
      text1: "Login Successful!",
      text2: "Welcome back to Anansesem 💫",
    });

    setTimeout(() => router.replace("/welcome"), 1500);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#5d198a] px-6">
      {/* Top Right Spiderweb */}
      <Image
        source={require('@/assets/images/spider-web-1.png')}
        className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        resizeMode="cover"
      />

      {/* Bottom Left Spiderweb */}
      <Image
        source={require('@/assets/images/spider-web-2.png')}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-[35px] font-poppins text-[#D0EE30] text-center mb-2">
          Sign In
        </Text>

        {/* Subtitle */}
        <Text className="text-white font-poppins text-center mb-6">
          Enter your account details to log in and continue setting up parental controls.
        </Text>

        {/* Form Card */}
        <View className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 font-poppins"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          {/* Password Field with Icon */}
          <View className="mb-4 border border-gray-300 rounded-lg flex-row items-center px-4">
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

          {/* Proceed */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#D0EE30] py-3 rounded-xl mt-6 mb-6"
          >
            <Text className="text-[#5d198a] text-center font-poppinsBold text-[18px]">Sign In</Text>
          </TouchableOpacity>

          {/* Create Account */}
          <TouchableOpacity onPress={() => router.push("/(onboarding)/sign-up")}>
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
            <Image source={require("@/assets/images/facebook.png")} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
            <Image source={require("@/assets/images/google.png")} className="w-6 h-6" />
          </TouchableOpacity>
          {Platform.OS === "ios" && (
            <TouchableOpacity className="w-14 h-14 bg-white rounded-lg items-center justify-center">
              <Image source={require("@/assets/images/apple.png")} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Popup Component */}
      <Toast />
    </View>
  );
}

import { signup } from "@/utils/api/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function SignUp() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "", 
  });

  const formatDateOfBirth = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Invalid date format");
  }
  return `${date}T00:00:00.000Z`;
};

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedName = await AsyncStorage.getItem("name");
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");

        if (savedName && savedEmail && savedPassword) {
          setForm((prev) => ({
            ...prev,
            name: savedName,
            email: savedEmail,
            password: savedPassword,
          }));
          setRememberMe(true);
        }
      } catch (e) {
        console.error("Failed to load saved credentials", e);
      }
    };

    loadSavedCredentials();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, password, phoneNumber, dateOfBirth } = form;

    if (!name || !email || !password || !phoneNumber || !dateOfBirth) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Please fill in all the fields 😊",
      });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address",
      });
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        ...form,
        dateOfBirth: formatDateOfBirth(dateOfBirth),
      };

      const data = await signup(payload);

      if (rememberMe) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
      }

      Toast.show({
        type: "success",
        text1: "Account Created!",
        text2: "Welcome to Anansesem 💫",
      });
    

      setTimeout(() => {
        router.replace("/(onboarding)/parental-consent");
      }, 1500);
    } catch (error: any) {
      console.error("Signup failed:", error);
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#60178b] px-6">
      <Image
        source={require("@/assets/images/spider-web-1.png")}
        className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
      />
      <Image
        source={require("@/assets/images/spider-web-2.png")}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[35px] font-caprasimo text-[#D0EE30] text-center mb-2">
          Create an account
        </Text>
        <Text className="text-white font-poppins text-center mb-6">
          Sign in with your own account to set up a profile and get more
          parental controls.
        </Text>

        <View className="bg-white rounded-2xl p-6 shadow-md">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#888"
            className="border border-gray-300 rounded-lg mb-4 px-4 py-3 font-poppins"
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg mb-4 px-4 py-3 font-poppins"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            className="border border-gray-300 rounded-lg mb-4 px-4 py-3 font-poppins"
            value={form.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          />
          <TextInput
            placeholder="Date of Birth (YYYY-MM-DD)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={10}
            className="border border-gray-300 rounded-lg mb-4 px-4 py-3 font-poppins"
            value={form.dateOfBirth}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, "");

              let formatted = cleaned;
              if (cleaned.length > 4 && cleaned.length <= 6) {
                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
              } else if (cleaned.length > 6) {
                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(
                  4,
                  6
                )}-${cleaned.slice(6, 8)}`;
              }

              handleChange("dateOfBirth", formatted);
            }}
          />

          <View className="border border-gray-300 rounded-lg mb-4 flex-row items-center px-4">
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
                color="#60178b"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? "#60178b" : undefined}
              />
              <Text className="ml-2 text-sm font-poppins text-gray-700">
                Remember me
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-sm font-poppins text-[#60178b] underline">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className={`py-3 rounded-xl mt-6 mb-6 ${
              isLoading ? "bg-[#D0EE30]/70" : "bg-[#D0EE30]"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#60178b" />
            ) : (
              <Text className="text-[#60178b] text-center font-poppinsBold text-[18px]">
                Proceed
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(onboarding)/sign-in")}
          >
            <Text className="text-center text-[#60178b] font-poppins mt-2 underline">
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white font-poppins text-center my-6">OR</Text>

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

      <Toast />
    </View>
  );
}

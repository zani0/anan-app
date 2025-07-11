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
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.password) {
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
            text1: "Account Created!",
            text2: "Welcome to Anansesem 💫",
        });

        setTimeout(() => router.replace("/(onboarding)/parental-consent"), 1500);
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
                <Text className="text-[35px] font-poppins text-4xl text-[#D0EE30] text-center mb-2">
                    Create an account
                </Text>

                {/* Subtitle */}
                <Text className="text-white font-poppins text-center mb-6">
                    Sign in with your own account to set up a profile and get more parental controls.
                </Text>

                {/* Form Card */}
                <View className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#888"
                        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 font-poppins"
                        value={form.name}
                        onChangeText={(text) => handleChange("name", text)}
                    />
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

                    {/* Checkbox + Forgot */}
                    <View className="flex-row justify-between items-center mt-1 mb-4">
                        <View className="flex-row items-center">
                            <Checkbox
                                value={rememberMe}
                                onValueChange={setRememberMe}
                                color={rememberMe ? "#5d198a" : undefined}
                            />
                            <Text className="ml-2 text-sm font-poppins text-gray-700">Remember me</Text>
                        </View>
                        <TouchableOpacity>
                            <Text className="text-sm font-poppins text-[#5d198a] underline">
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Proceed */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-[#D0EE30] py-3 rounded-xl mt-6 mb-6"
                    >
                        <Text className="text-[#5d198a] text-center font-poppinsBold text-[18px]">Proceed</Text>
                    </TouchableOpacity>

                    {/* Sign In */}
                    <TouchableOpacity onPress={() => router.push("/(onboarding)/sign-in")}>
                        <Text className="text-center text-[#5d198a] font-poppins mt-2 underline">
                            Already have an account? Sign In
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

            <Toast />
        </View>
    );
}

import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <View className="flex-row justify-between items-center px-4 mb-6 bg-white">
      {/* Spider Web Background Image */}
      <Image
        source={require("@/assets/images/spider-web-3.png")}
        className="w-[150px] h-[120px] absolute top-[-80] right-[-6]"
      />
      {/* Left: Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={require("@/assets/images/left-arrow.png")}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right: Avatar */}
      <TouchableOpacity onPress={() => router.push("/account")}>
        <Image
          source={require("@/assets/images/avatar.png")}
          className="w-11 h-11 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}

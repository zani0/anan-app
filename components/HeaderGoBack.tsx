import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useUser } from "@/context/UserContext";

export default function Header() {
  const { user } = useUser();
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

      {/* Left: Logo */}
      <View className="items-center m-0">
        <Image
          source={require("@/assets/images/anansesem-logo.png")}
          className="w-[80px] h-10"
          resizeMode="contain"
        />
        <Text className="text-[18px] font-caprasimo text-[#5a1786]">
          Anansesem
        </Text>
      </View>

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

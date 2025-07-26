import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const profileData = await AsyncStorage.getItem("selectedProfile");
        const userData = await AsyncStorage.getItem("user");

        if (!profileData || !userData) return;

        const profile = JSON.parse(profileData);
        const user = JSON.parse(userData);
        const token = user?.data?.access_token;

        const response = await fetch(
          `https://anansesem.onrender.com/api/v1/profile/${profile.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch profile", response.status);
          return;
        }

        const profileResult = await response.json();

        const avatar = profileResult?.data?.avatar;

        if (avatar && avatar !== "") {
          setAvatarUrl(avatar);
        } else {
          setAvatarUrl(
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.name
            )}&background=random&color=fff&bold=true`
          );
        }
      } catch (error) {
        console.error("Error loading avatar", error);
      }
    };

    fetchAvatar();
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
        <Text className="text-[18px] font-caprasimo text-[#5D1889]">
          Anansesem
        </Text>
      </View>

      {/* Right: Avatar */}
      <TouchableOpacity onPress={() => router.push("/account")}>
        <Image
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require("@/assets/images/avatar.png")
          }
          className="w-11 h-11 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}

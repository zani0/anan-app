import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function Achievements() {
  const router = useRouter();

  // Create 9 placeholders
  const data = new Array(9).fill(null);

  return (
    <View className="my-4">
      {/* Section Header */}
      <View className="mb-4">
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[60vw]">
          <Text className="text-white text-base font-poppinsBold">
            Your collected badges
          </Text>
        </View>
      </View>

      {/* 3x3 Grid */}
      <View className="flex-row flex-wrap justify-between">
        {data.map((_, index) => (
          <View
            key={index}
            className="bg-gray-200 rounded-xl items-center justify-center mb-4"
            style={{
              width: (screenWidth - 48) / 3, 
              height: (screenWidth - 48) / 3,
            }}
          >
            <Image
              source={require("@/assets/images/padlock.png")}
              style={{ width: 60, height: 60, marginBottom: 8 }}
              resizeMode="cover"
            />
            <Text className="font-poppinsBold text-gray-700 text-base">0</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

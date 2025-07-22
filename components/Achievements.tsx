import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Heart, Flag } from "lucide-react-native";
import { useRouter } from "expo-router";



export default function Achievements() {
  const router = useRouter();

  return (
    <View className="my-2">
      {/* Section Header */}
      <View className="">
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[70vw]">
          <Text className="text-white text-base font-poppinsBold">
            Your achievements
          </Text>
        </View>
      </View>

    </View>
  );
}

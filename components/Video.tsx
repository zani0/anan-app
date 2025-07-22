import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Video({ onPress }: { onPress?: () => void }) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className="rounded-2xl overflow-hidden my-2"
      >
        {/* Background Image */}
        <View className="relative w-full h-56">
          <Image
            source={require("@/assets/images/cartoon.jpg")}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Play Button Overlay */}
          <View className="absolute inset-0 items-center justify-center">
            <View className="w-12 h-12 bg-lime-300 rounded-full items-center justify-center">
              <Text className="text-black font-bold text-xl">▶</Text>
            </View>
            <Text className="text-white mt-2 font-medium font-poppins">
              Play Video
            </Text>
          </View>

          {/* Info Overlay */}
        </View>
      </TouchableOpacity>
      <View className="bottom-0 w-full px-4 py-3 flex-row justify-between items-end">
        <View>
          <Text className="text-purple-900 font-poppinsBold text-[18px]">
            The three village hunters
          </Text>
          <Text className="text-purple-900 text-xs font-poppins">
            Story by Nutifafa Tsikata
          </Text>
        </View>

        <Text className="text-purple-900 text-xs font-poppins">
        </Text>
      </View>
    </>
  );
}

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function CategorySlider() {
  const router = useRouter();

  return (
    <View className="my-4 px-4 flex-row justify-between">
      {/* Recommended */}
      <TouchableOpacity
        className="items-center w-[60px]"
        onPress={() => router.push("/recommended")}
      >
        <Image
          source={require("@/assets/images/icon-recommended.png")}
          className="w-[50px] h-[50px] mb-1"
          resizeMode="contain"
        />
        <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
          Recommended
        </Text>
      </TouchableOpacity>

      {/* Watch */}
      <TouchableOpacity
        className="items-center w-[60px]"
        onPress={() => router.push("/watch")}
      >
        <Image
          source={require("@/assets/images/icon-watch.png")}
          className="w-[50px] h-[50px] mb-1"
          resizeMode="contain"
        />
        <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
          Watch
        </Text>
      </TouchableOpacity>

      {/* Music */}
      <TouchableOpacity
        className="items-center w-[60px]"
        onPress={() => router.push("/music")}
      >
        <Image
          source={require("@/assets/images/icon-music.png")}
          className="w-[50px] h-[50px] mb-1"
          resizeMode="contain"
        />
        <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
          Music
        </Text>
      </TouchableOpacity>

      {/* Compete */}
      <TouchableOpacity
        className="items-center w-[60px]"
        onPress={() => router.push("/compete")}
      >
        <Image
          source={require("@/assets/images/icon-compete.png")}
          className="w-[50px] h-[50px] mb-1"
          resizeMode="contain"
        />
        <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
          Compete
        </Text>
      </TouchableOpacity>

      {/* Create */}
      <TouchableOpacity
        className="items-center w-[60px]"
        onPress={() => router.push("/generate-story")}
      >
        <Image
          source={require("@/assets/images/icon-create.png")}
          className="w-[50px] h-[50px] mb-1"
          resizeMode="contain"
        />
        <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}

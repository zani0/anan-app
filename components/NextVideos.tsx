import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Heart, Flag } from "lucide-react-native";
import { router } from "expo-router";

const videos = [
  {
    id: "1",
    title: "The day at the cinema with Jenny",
    duration: "5:00",
    category: "Adventure",
    thumbnail: require("@/assets/images/vid1.png"),
  },
  {
    id: "2",
    title: "Kweku Ananse visits his farm in the village",
    duration: "1:06:05",
    category: "Adventure",
    thumbnail: require("@/assets/images/cartoon.jpg"),
  },
  {
    id: "3",
    title: "Alidu Gariba goes on a fancy trip",
    duration: "55:00",
    category: "Adventure",
    thumbnail: require("@/assets/images/vid3.png"),
  },
  {
    id: "4",
    title: "The Quansah’s go on a family vacation",
    duration: "10:00",
    category: "Adventure",
    thumbnail: require("@/assets/images/lion.jpg"),
  },
];

export default function NextVideos() {
  return (
    <View className="my-2">
      {/* Section Header */}
      <View className="">
        <View className="bg-[#60178b] px-4 py-2 rounded-r-[40px] rounded-tl-[40px] rounded-br-0  w-[35vw]">
          <Text className="text-lime-300 font-poppinsBold text-center text-base">
            Next Videos
          </Text>
        </View>
      </View>

      {/* Horizontal List */}
      <FlatList
        data={videos}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 12 }}
        ItemSeparatorComponent={() => <View className="w-4" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/watch-video")}
            className="bg-white rounded-xl w-44 overflow-hidden shadow-md"
            activeOpacity={0.8}
          >
            {/* Thumbnail Section */}
            <View className="relative h-36 w-full">
              <Image
                source={item.thumbnail}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* Category Badge */}
              <View className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full">
                <Text className="text-white text-xs font-medium">
                  {item.category}
                </Text>
              </View>

              {/* Duration */}
              <View className="absolute bottom-2 right-2 bg-lime-300 px-2 py-0.5 rounded">
                <Text className="text-black text-xs font-poppinsBold">
                  {item.duration}
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View className="bg-[#60178b] p-3 rounded-b-xl h-28 justify-between">
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-white font-poppins text-[14px]"
              >
                {item.title}
              </Text>

              {/* Divider */}
              <View className="border-b border-white my-2" />

              {/* Icons */}
              <View className="flex-row justify-between items-center">
                <Heart size={16} color="white" />
                <Flag size={16} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

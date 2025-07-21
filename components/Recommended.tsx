import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Heart, Flag } from "lucide-react-native";

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

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 24; // accounting for spacing

export default function RecommendedVideos() {
  return (
    <View className="my-2">
      {/* Section Header */}
      <View>
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[70vw]">
          <Text className="text-white font-semibold text-base">
            Recommended Videos
          </Text>
        </View>
      </View>

      {/* Grid List */}
      <FlatList
        data={videos}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16, paddingHorizontal: 0 }}
        contentContainerStyle={{ paddingTop: 12, gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ width: cardWidth }}
            className="bg-white rounded-xl overflow-hidden shadow-md"
          >
            {/* Thumbnail */}
            <View className="relative h-36 w-full">
              <Image
                source={item.thumbnail}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* Category Badge */}
              <View className="absolute top-2 left-2 bg-black/40 px-2 py-0.5 rounded-full">
                <Text className="text-white text-xs font-medium">
                  {item.category}
                </Text>
              </View>

              {/* Duration */}
              <View className="absolute bottom-2 right-2 bg-lime-300 px-2 py-0.5 rounded">
                <Text className="text-black text-xs font-bold">
                  {item.duration}
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View className="bg-[#60178b] p-3 rounded-b-xl h-28 justify-between">
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-white font-medium text-sm"
              >
                {item.title}
              </Text>

              <View className="border-b border-white my-2" />

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

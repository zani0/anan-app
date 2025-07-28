import { router } from "expo-router";
import { Heart, Flag } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";

const initialFavorites = [
  {
    id: "1",
    title: "The day at the cinema with Jenny",
    duration: "5:00",
    category: "Adventure",
    thumbnail: require("@/assets/images/vid1.png"),
    dateAdded: "2025-07-20",
  },
  {
    id: "2",
    title: "Kweku Ananse visits his farm in the village",
    category: "Folklore",
    thumbnail: require("@/assets/images/cartoon.jpg"),
    dateAdded: "2025-07-26",
  },
  {
    id: "3",
    title: "Alidu Gariba goes on a fancy trip",
    duration: "55:00",
    category: "Adventure",
    thumbnail: require("@/assets/images/vid3.png"),
    dateAdded: "2025-07-18",
  },
];

export default function Favorites() {
  const filters = ["All", "Recent", "Oldest"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(initialFavorites);

  const sortedStories = [...favorites].sort((a, b) => {
    if (selectedFilter === "Recent") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    if (selectedFilter === "Oldest") {
      return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    }
    return 0;
  });

  const renderFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {filters.map((filter) => {
        const isSelected = filter === selectedFilter;
        return (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            className={`px-4 py-1 mr-3 rounded-full border ${
              isSelected
                ? "bg-[#5D1889] border-[#5D1889]"
                : "bg-white border-[#ddd]"
            }`}
          >
            <Text
              className={`font-poppins text-xs ${
                isSelected ? "text-white" : "text-[#333]"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((story) => story.id !== id));
  };

  return (
    <View className="flex-1 bg-white">
      {renderFilter()}

      <FlatList
        data={sortedStories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
        ListFooterComponent={<View style={{ height: 80 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl overflow-hidden shadow-md"
            style={{ width: "48%" }}
            activeOpacity={0.8}
            onPress={() => {
              if (item.id === "2") {
                router.push("/full-story");
              }
            }}
          >
            {/* Thumbnail */}
            <View className="relative h-36 w-full">
              <Image
                source={item.thumbnail}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* Category */}
              <View className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full">
                <Text className="text-white text-xs font-medium font-poppins">
                  {item.category}
                </Text>
              </View>

              {/* Duration */}
              {item.duration && (
                <View className="absolute bottom-2 right-2 bg-lime-300 px-2 py-0.5 rounded">
                  <Text className="text-black text-xs font-poppinsBold">
                    {item.duration}
                  </Text>
                </View>
              )}
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

              <View className="border-b border-white my-2" />

              <View className="flex-row justify-between items-center">
                <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                  <Heart size={16} color="white" fill="white" />
                </TouchableOpacity>
                <Flag size={16} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

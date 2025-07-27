import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Heart, Flag } from "lucide-react-native";
import { useRouter } from "expo-router";

const videos = [
  {
    id: "1",
    title: "The day at the cinema with Jenny",
    duration: "5:00",
    category: "Adventure",
    thumbnail: require("@/assets/images/vid3.png"),
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

export default function Recommended() {
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [videoToFlag, setVideoToFlag] = useState<any>(null);
  const [showFavoritePopup, setShowFavoritePopup] = useState(false); // ✅ NEW

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];

      if (!prev.includes(id)) {
        setShowFavoritePopup(true); // ✅ Show popup only when adding
      }

      return updated;
    });
  };

  const handleFlagPress = (video: any) => {
    setVideoToFlag(video);
    setShowFlagPopup(true);
  };

  const confirmFlag = () => {
    setShowFlagPopup(false);
  };

  return (
    <View className="my-2">
      {/* Section Header */}
      <View className="">
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[55vw]">
          <Text className="text-white text-base font-poppinsBold">
            Recommended for you
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
        renderItem={({ item }) => {
          const isFavorited = favorites.includes(item.id);
          return (
            <TouchableOpacity
              onPress={() => router.push("/watch-video")}
              className="bg-white rounded-xl w-60 overflow-hidden shadow-md"
              activeOpacity={0.8}
            >
              {/* Thumbnail */}
              <View className="relative h-36 w-full">
                <Image
                  source={item.thumbnail}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Category Badge */}
                <View className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full">
                  <Text className="text-white text-xs font-medium font-poppins">
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

                <View className="border-b border-white my-2" />

                {/* Icons */}
                <View className="flex-row justify-between items-center">
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Heart
                      size={20}
                      color="white"
                      fill={isFavorited ? "white" : "none"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleFlagPress(item)}>
                    <Flag size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* 🚩 Flag Confirmation Popup */}
      <Modal visible={showFlagPopup} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white p-6 rounded-3xl w-full max-w-md items-center shadow-lg">
            <Text className="text-xl font-bold text-purple-800 text-center mb-2">
              🚩 Report this video?
            </Text>
            <Text className="text-lg text-center text-gray-800 font-poppins mb-4">
              Are you sure you want to report “{videoToFlag?.title}”?
            </Text>
            <View className="flex-row justify-between w-full mt-2 space-x-4">
              <Pressable
                className="flex-1 bg-gray-200 py-3 rounded-full items-center mr-2"
                onPress={() => setShowFlagPopup(false)}
              >
                <Text className="text-black font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className="flex-1 bg-red-500 py-3 rounded-full items-center"
                onPress={confirmFlag}
              >
                <Text className="text-white font-semibold">Report</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showFavoritePopup} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white p-6 rounded-3xl w-full max-w-md items-center shadow-lg">
            <Text className="text-xl font-bold text-purple-800 text-center mb-2">
              💖 Added to Favorites!
            </Text>
            <Text className="text-lg text-center text-gray-800 font-poppins mb-4">
              Would you like to view your favorites now?
            </Text>
            <View className="flex-row justify-between w-full mt-2 space-x-4">
              <Pressable
                className="flex-1 bg-gray-200 py-3 rounded-full items-center mr-2"
                onPress={() => setShowFavoritePopup(false)}
              >
                <Text className="text-black font-semibold">Not now</Text>
              </Pressable>
              <Pressable
                className="flex-1 bg-lime-400 py-3 rounded-full items-center"
                onPress={() => {
                  setShowFavoritePopup(false);
                  router.push("/favorites"); 
                }}
              >
                <Text className="text-black font-semibold">View Favorites</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

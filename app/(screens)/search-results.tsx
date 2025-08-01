import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, Flag } from "lucide-react-native";
import Header from "@/components/HeaderGoBack";
import SearchBar from "@/components/Search";
import CategorySlider from "@/components/CategorySlider";

const screenHeight = Dimensions.get("window").height;

const mockResults = [
  {
    id: "1",
    title: "A Visit to the Forest",
    category: "Folklore",
    thumbnail: require("@/assets/images/vid1.png"),
  },
  {
    id: "2",
    title: "Ananse and the Pot of Wisdom",
    category: "Folklore",
    thumbnail: require("@/assets/images/cartoon.jpg"),
  },
  {
    id: "3",
    title: "Why the Sky is Far Away",
    category: "Legends",
    thumbnail: require("@/assets/images/vid1.png"),
  },
];

export default function SearchResults() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query: string }>();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [videoToFlag, setVideoToFlag] = useState<any>(null);
  const [showFavoritePopup, setShowFavoritePopup] = useState(false);

  const filteredResults = mockResults.filter((item) =>
    item.title.toLowerCase().includes(query?.toLowerCase() ?? "")
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];

      if (!prev.includes(id)) {
        setShowFavoritePopup(true);
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
    <View className="flex-1 bg-white">
      <FlatList
        data={filteredResults.length > 0 ? filteredResults : mockResults}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <View
            style={{ paddingTop: insets.top + 20, backgroundColor: "white" }}
            className="px-4"
          >
            <Header />
            <SearchBar />
            <CategorySlider />
            {filteredResults.length > 0 ? (
              <Text className="text-[#60178b] font-poppinsBold text-[20px] text-center my-4 mb-6">
                You searched for{" "}
                <Text className="font-poppinsBold">"{query}"</Text>
              </Text>
            ) : (
              <View className="my-8 mb-6">
                <Text className="text-[#60178b] font-poppinsBold text-[22px] text-center">
                  Ananse could not find “{query}”
                </Text>
                <Text className="text-center text-[#60178b] font-poppinsBold text-[20px] text-base">
                  Watch these instead?
                </Text>
              </View>
            )}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
        ListFooterComponent={<View style={{ height: 80 }} />}
        renderItem={({ item }) => {
          const isFavorited = favorites.includes(item.id);

          return (
            <TouchableOpacity
              className="bg-white rounded-xl overflow-hidden shadow-md"
              style={{ width: "48%" }}
              activeOpacity={0.8}
              onPress={() => {
                router.push("/full-story");
              }}
            >
              <View className="relative h-36 w-full">
                <Image
                  source={item.thumbnail}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full">
                  <Text className="text-white text-xs font-medium font-poppins">
                    {item.category}
                  </Text>
                </View>
              </View>
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

      {/* 🚩 Flag Modal */}
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
                className="flex-1 bg-gray-200 py-3 rounded-full items-center"
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

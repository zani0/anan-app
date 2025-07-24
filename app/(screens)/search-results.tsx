import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, Flag } from "lucide-react-native";
import Header from "@/components/Header";
import SearchBar from "@/components/Search";

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
];

export default function SearchResults() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [results] = useState(mockResults); // Static for now

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <View
            style={{
              paddingTop: insets.top + 20,
              backgroundColor: "white",
            }}
            className="px-4"
          >
            <Header />
            <SearchBar />
            <Text className="text-black font-poppins text-lg text-center my-4 mb-6">
              You searched for: <Text className="font-poppinsBold">{query}</Text>
            </Text>
          </View>
        }
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
              {/* {item.duration && (
                <View className="absolute bottom-2 right-2 bg-lime-300 px-2 py-0.5 rounded">
                  <Text className="text-black text-xs font-poppinsBold">
                    {item.duration}
                  </Text>
                </View>
              )} */}
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

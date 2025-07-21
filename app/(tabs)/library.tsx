import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/Search";
import { Heart, Flag } from "lucide-react-native";

const filters = ["All", "Folklore", "Adventure"];
const savedStories = [
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

export default function Library() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredStories =
    selectedFilter === "All"
      ? savedStories
      : savedStories.filter((item) => item.category === selectedFilter);

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
            className={`px-4 py-2 mr-3 rounded-full border ${
              isSelected
                ? "bg-[#5a1786] border-[#5a1786]"
                : "bg-white border-[#ddd]"
            }`}
          >
            <Text
              className={`font-poppins text-sm ${
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

  const renderHeader = () => (
    <View
      style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 0,
        marginBottom: 10,
        backgroundColor: "white",
      }}
    >
      <Header />
      <Text className="font-poppins text-lg px-4 mb-2">
        Find interesting stories and more...
      </Text>
      <SearchBar />
      {renderFilter()}
    </View>
  );

  return (
    <FlatList
      data={filteredStories}
      keyExtractor={(item) => item.id}
      numColumns={2}
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 16,
      }}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={<View style={{ height: 80 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="bg-white rounded-xl overflow-hidden shadow-md"
          style={{ width: "48%" }}
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
  );
}

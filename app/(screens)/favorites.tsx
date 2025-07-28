import CategorySlider from "@/components/CategorySlider";
import Favorites from "@/components/Favorites";
import Header from "@/components/HeaderGoBack";
import SearchBar from "@/components/Search";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 0,
        marginBottom: 10,
      }}
      className="bg-white flex-1"
    >
      <View className="px-4 bg-white">
        <Header />
        <SearchBar />
        <CategorySlider />
      </View>
      <Favorites />
    </ScrollView>
  );
}

import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import { useRouter } from "expo-router";
import CategorySlider from "@/components/CategorySlider";
import SearchBar from "@/components/Search";
import RecentlyWatched from "@/components/RecentlyWatched";
import RecommendedVideos from "@/components/Recommended";
import BannerVideo from "@/components/BannerVideo";

const categories = [
  {
    label: "History",
    icon: require("@/assets/icons/history.png"),
    bgColor: "#FEE2E2",
  },
  {
    label: "Science",
    icon: require("@/assets/icons/science.png"),
    bgColor: "#D1FAE5",
  },
  {
    label: "Folklore",
    icon: require("@/assets/icons/book.png"),
    bgColor: "#E0E7FF",
  },
  {
    label: "Culture",
    icon: require("@/assets/icons/world.png"),
    bgColor: "#FFF7CD",
  },
  {
    label: "Wildlife",
    icon: require("@/assets/icons/elephant.png"),
    bgColor: "#DCFCE7",
  },
  {
    label: "Legends",
    icon: require("@/assets/icons/torch.png"),
    bgColor: "#EDE9FE",
  },
];

const featuredStories = [
  {
    id: "1",
    title: "The Lorem Ipsum",
    image:
      "https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop",
    category: "Adventure",
  },
  {
    id: "2",
    title: "Rainforest Wonders",
    image:
      "https://images.unsplash.com/photo-1631582053308-40f482e7ace5?q=80&w=1631&auto=format&fit=crop",
    category: "Wildlife",
  },
  {
    id: "3",
    title: "How the Spider Saved the Village",
    image:
      "https://plus.unsplash.com/premium_photo-1681426478241-11b262dd1d21?q=80&w=880&auto=format&fit=crop",
    category: "Folklore",
  },
  {
    id: "4",
    title: "The Talking Drum",
    image:
      "https://images.unsplash.com/photo-1616098063625-65f32186e609?w=500&auto=format&fit=crop&q=60",
    category: "Culture",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 80,
        }}
      >
        <Header />

        <SearchBar />
        <CategorySlider />

        <BannerVideo />
        <RecentlyWatched />
        <RecommendedVideos />
      </ScrollView>
      <FloatingButton />
    </View>
  );
}

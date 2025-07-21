import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import FloatingButton from "@/components/GenerateButton";
import CategorySlider from "@/components/CategorySlider";
import SearchBar from "@/components/Search";
import RecentlyWatched from "@/components/RecentlyWatched";
import RecommendedVideos from "@/components/Recommended";
import BannerVideo from "@/components/BannerVideo";

export default function HomeScreen() {
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
        <View className="my-2"></View>
        <RecentlyWatched />
        <View className="my-2"></View>
        <RecommendedVideos />
      </ScrollView>
      <FloatingButton />
    </View>
  );
}

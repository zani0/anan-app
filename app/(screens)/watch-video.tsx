import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/HeaderGoBack";
import CategorySlider from "@/components/CategorySlider";
import BannerVideo from "@/components/BannerVideo";
import Video from "@/components/Video";
import NextVideos from "@/components/NextVideos";

export default function WatchVideo() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-1 bg-white px-4"
        style={{
          paddingTop: insets.top + 0,
          paddingBottom: 80,
        }}
      >
        <Header />
        <CategorySlider />
        <Video />
        <View className="my-2"></View>
        <NextVideos />
      </View>
    </View>
  );
}

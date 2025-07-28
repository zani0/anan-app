import Achievements from "@/components/Achievements";
import CategorySlider from "@/components/CategorySlider";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Stats() {
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
      <CategorySlider />
            <Leaderboard />

      <Achievements />
    </ScrollView>
    </View>
  );
}

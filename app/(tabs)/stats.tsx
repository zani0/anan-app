import Achievements from "@/components/Achievements";
import CategorySlider from "@/components/CategorySlider";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Stats() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      contentContainerStyle={{ paddingBottom: 100 }}
      className="flex-1 bg-white px-4"
    >
      <Header />
      <CategorySlider />
      <Achievements />
      <Leaderboard />
    </ScrollView>
  );
}

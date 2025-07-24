import Achievements from "@/components/Achievements";
import CategorySlider from "@/components/CategorySlider";
import Header from "@/components/HeaderGoBack";
import Leaderboard from "@/components/Leaderboard";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Watch() {
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
        <View className="justify-between items-center px-4 py-3 bg-white rounded-b-3xl">
          <Text className="text-4xl text-[#5a1786] font-caprasimo">
            Watch
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
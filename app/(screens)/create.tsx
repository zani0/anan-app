import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Heart, Share2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import Header from "@/components/HeaderGoBack";

export default function FullStory() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Top Bar */}
      <Header />
    
    </ScrollView>
  );
}

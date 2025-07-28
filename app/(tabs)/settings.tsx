import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Settings from "@/components/Settings";
import CategorySlider from "@/components/CategorySlider";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const menuItems = [
    { label: "Audio settings", route: "/settings/audio" },
    { label: "Language settings", route: "/settings/language" },
    { label: "Parental controls", route: "/account" },
    { label: "Notifications", isSwitch: true },
    { label: "Privacy and security", route: "/settings/privacy" },
    { label: "Subscriptions", route: "/settings/subscriptions" },
    { label: "Help/Support", route: "/settings/help" },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 80,
        }}
      >
        <View className="mb-0">
          <Header />
        </View>

        <View className="bg-[#60178b] mt-4 px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[40vw]">
          <Text className="text-[22px] text-[#ffffff] font-poppinsBold">
            Settings
          </Text>
        </View>
        <Settings />
      </ScrollView>
    </View>
  );
}

import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Settings from "@/components/Settings";

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
    <>
      <Header />

      {/* Header */}
      <View className="justify-between items-center px-4 py-3 bg-white rounded-b-3xl">
        <Text className="text-4xl text-[#5D1889] font-caprasimo">Settings</Text>
      </View>
      <Settings />
    </>
  );
}

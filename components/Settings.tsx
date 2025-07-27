import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Settings() {
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
    <ScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: 80,
      }}
    >

      {/* Settings list */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingVertical: 20,
          backgroundColor: "white",
        }}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={item.isSwitch ? 1 : 0.7}
            onPress={() => {
              if (!item.isSwitch && item.route) {
                router.push(item.route as any);
              }
            }}
            className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center space-x-4">
              <View className="w-4 h-4 rounded-full bg-purple-300 mr-4" />
              <Text className="text-base text-black font-poppins">
                {item.label}
              </Text>
            </View>

            {item.isSwitch ? (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#ccc", true: "#8B5CF6" }}
                thumbColor={notificationsEnabled ? "#fff" : "#fff"}
              />
            ) : (
              <Ionicons name="chevron-forward" size={18} color="black" />
            )}
          </TouchableOpacity>
        ))}

        {/* Delete account button */}
        <View className="mt-16 px-6">
          <TouchableOpacity className="bg-red-600 rounded-full py-4 items-center justify-center">
            <Text className="text-white font-poppinsBold">
              Delete account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

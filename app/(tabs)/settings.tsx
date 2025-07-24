import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const menuItems = [
    { label: "Audio settings" },
    { label: "Language settings" },
    { label: "Parental controls" },
    { label: "Notifications", isSwitch: true },
    { label: "Privacy and security" },
    { label: "Subscriptions" },
    { label: "Help/Support" },
  ];
  return (
    <ScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: 80,
      }}
    >
      <Header />
      {/* Header */}
      <View className="justify-between items-center px-4 py-3 bg-white rounded-b-3xl">
        <Text className="text-4xl text-[#5a1786] font-caprasimo">Settings</Text>
      </View>

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
          <TouchableOpacity className="bg-yellow-400 rounded-full py-4 items-center justify-center">
            <Text className="text-black font-poppins font-medium">
              Delete account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

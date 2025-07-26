import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heart, Flag, BookOpen, Settings, LayoutDashboard, CreditCard } from "lucide-react-native";
import Header from "@/components/HeaderGoBack";
import VerifyAgePopup from "@/components/VerifyAgePopup";

const TABS = ["Dashboard", "Library", "Subscriptions", "Settings"];
const screenWidth = Dimensions.get("window").width;

export default function ParentAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showVerifyAge, setShowVerifyAge] = useState(false);
  const [name, setName] = useState("Parent");

  const children = [{ name: "Elliot" }, { name: "Maya" }];

  useEffect(() => {
    const loadParentName = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          const accountName = parsed?.data?.name;
          if (accountName) setName(accountName);
        }
      } catch (error) {
        console.error("Failed to load account name:", error);
      }
    };
    loadParentName();
  }, []);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setShowVerifyAge(true);
  };

  const handleVerifyComplete = (age: number) => {
    setShowVerifyAge(false);
    if (age < 18) router.back();
  };

  const renderTopPicks = (childName: string) => {
    const data = [1, 2, 3, 4]; // Placeholder
    return (
      <View className="mb-8">
        <Text className="text-lg font-poppinsBold text-[#60178b] mb-2 px-4">
          Top Picks for {childName}
        </Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${childName}-${index}`}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white rounded-xl overflow-hidden shadow-md"
              style={{ width: screenWidth * 0.6 }}
              activeOpacity={0.8}
              onPress={() => router.push("/watch-video")}
            >
              <View className="relative h-36 w-full">
                <Image
                  source={require("@/assets/images/vid2.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full">
                  <Text className="text-white text-xs font-medium font-poppins">
                    Adventure
                  </Text>
                </View>
                <View className="absolute bottom-2 right-2 bg-lime-300 px-2 py-0.5 rounded">
                  <Text className="text-black text-xs font-poppinsBold">
                    3:45
                  </Text>
                </View>
              </View>
              <View className="bg-[#60178b] p-3 rounded-b-xl h-28 justify-between">
                <Text numberOfLines={2} className="text-white font-poppins text-[14px]">
                  Story Title
                </Text>
                <View className="border-b border-white my-2" />
                <View className="flex-row justify-between items-center">
                  <Heart size={16} color="white" />
                  <Flag size={16} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderDashboard = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Text className="text-center text-3xl font-caprasimo text-[#60178b] my-6">
        Welcome, {name}
      </Text>

      <View className="px-4">
        <View className="bg-[#f6f3fa] rounded-xl p-4 mb-6">
          <Text className="text-lg font-poppinsBold text-[#60178b] mb-2">
            Your Children
          </Text>
          {children.map((child, i) => (
            <View
              key={i}
              className="flex-row justify-between items-center border-t border-[#60178b] py-2"
            >
              <Text className="font-poppins text-black">{child.name}</Text>
              <TouchableOpacity className="bg-gray-200 px-3 py-1 rounded-full">
                <Text className="text-xs font-poppins">Manage</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="bg-[#f6f3fa] rounded-xl p-4 mb-6">
          <Text className="text-lg font-poppinsBold text-[#60178b] mb-2">
            Comprehension Progress
          </Text>
          <Image
            source={require("@/assets/images/chart.png")}
            className="w-full h-[100px] rounded-md"
            resizeMode="contain"
          />
        </View>
      </View>

      {children.map((child) => renderTopPicks(child.name))}

      <View className="px-4">
        <TouchableOpacity
          onPress={() => router.push("/choose-profile")}
          className="bg-[#60178b] mt-4 py-3 rounded-full items-center"
        >
          <Text className="text-white text-lg font-poppinsBold">Switch Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowLogoutConfirm(true)}
          className="bg-yellow-400 mt-4 py-3 rounded-full items-center"
        >
          <Text className="text-black text-lg font-poppinsBold">Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return renderDashboard();
      case "Library":
        return <Text className="text-center mt-20 text-[#60178b]">Library coming soon!</Text>;
      case "Subscriptions":
        return <Text className="text-center mt-20 text-[#60178b]">Your Subscriptions</Text>;
      case "Settings":
        return <Text className="text-center mt-20 text-[#60178b]">App Settings</Text>;
      default:
        return null;
    }
  };

  const tabIcons = {
    Dashboard: LayoutDashboard,
    Library: BookOpen,
    Subscriptions: CreditCard,
    Settings: Settings,
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="mx-4">
        <Header />
      </View>

      {renderTabContent()}

      {/* Tab Bar */}
      <View className="flex-row justify-around items-center py-3 border-t border-gray-200 bg-white">
        {TABS.map((tab) => {
          const Icon = tabIcons[tab];
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className="items-center">
              <Icon size={22} color={isActive ? "#60178b" : "#ccc"} />
              <Text
                className={`text-xs mt-1 font-poppinsBold ${
                  isActive ? "text-[#60178b]" : "text-gray-400"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout Modal */}
      <Modal transparent visible={showLogoutConfirm} animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center px-8">
          <View className="bg-white p-6 rounded-2xl w-full items-center">
            <Text className="text-black font-poppins text-lg mb-4 text-center">
              Are you sure you want to log out?
            </Text>
            <TouchableOpacity
              onPress={confirmLogout}
              className="bg-yellow-400 px-6 py-3 rounded-full mb-2"
            >
              <Text className="text-black font-poppinsBold">Yes, verify age</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogoutConfirm(false)}>
              <Text className="text-gray-500 font-poppins text-sm underline">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showVerifyAge && (
        <VerifyAgePopup visible={showVerifyAge} onClose={() => setShowVerifyAge(false)} />
      )}
    </View>
  );
}

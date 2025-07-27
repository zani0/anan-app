import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heart, Flag } from "lucide-react-native";
import Header from "@/components/HeaderGoBack";
import Settings from "@/components/Settings";

const screenWidth = Dimensions.get("window").width;

const TABS = ["Dashboard", "Library", "Subscriptions", "Settings"];

export default function ParentAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
    router.back();
  };

  const renderTopPicks = (childName: string) => {
    const data = [1, 2, 3, 4];
    return (
      <View className="mb-8">
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 mb-5 w-[55vw]">
          <Text className="text-lg font-poppinsBold text-white px-4">
            Top Picks for {childName}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={`${childName}-${index}`}
              className="bg-white rounded-xl overflow-hidden shadow-md mr-4"
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
                <Text
                  numberOfLines={2}
                  className="text-white font-poppins text-[14px]"
                >
                  Story Title
                </Text>
                <View className="border-b border-white my-2" />
                <View className="flex-row justify-between items-center">
                  <Heart size={16} color="white" />
                  <Flag size={16} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-4">
        <Header showProfilePicture={false} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Section */}
        <View className="items-center mt-6 mb-12">
          <Image
            source={require("@/assets/images/avatar.png")}
            className="w-20 h-20 rounded-full mb-2"
            resizeMode="cover"
          />
          <Text className="text-2xl font-caprasimo text-[#60178b]">
            Hello, {name}
          </Text>
        </View>

        {/* Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24}}
          className="mb-6 mx-2"
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedTab === tab ? "bg-[#60178b]" : "bg-[#f2e8fa]"
              }`}
            >
              <Text
                className={`text-sm font-poppinsBold ${
                  selectedTab === tab ? "text-white" : "text-[#60178b]"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Content */}
        {selectedTab === "Dashboard" && (
          <View className="px-4">
            {/* Children List */}
            <View className="bg-[#f6f3fa] rounded-xl p-4 mb-6">
              <Text className="text-lg font-poppinsBold text-[#60178b] mb-2">
                Your Children
              </Text>
              {children.map((child, i) => (
                <View
                  key={child.name}
                  className="flex-row justify-between items-center border-[#60178b] py-2"
                >
                  <Text className="font-poppins text-black">{child.name}</Text>
                  <TouchableOpacity
                    className="bg-gray-200 px-3 py-1 rounded-full"
                    onPress={() => router.push("/account/edit-child-profile")}
                  >
                    <Text className="text-xs font-poppins">Manage</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View className="bg-[#f6f3fa] rounded-xl p-4 mb-6">
              <Text className="text-lg font-poppinsBold text-[#60178b] mb-4">
                Comprehension Progress
              </Text>
              <View className="flex-row flex-wrap justify-between">
                {children.map((child, i) => (
                  <View
                    key={i}
                    className="bg-white rounded-lg mb-4 p-3"
                    style={{ width: "48%" }}
                  >
                    <Text className="font-poppinsBold text-[#60178b] mb-2">
                      {child.name}
                    </Text>
                    <Image
                      source={require("@/assets/images/chart.png")}
                      className="w-full h-[80px] rounded-md"
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Top Picks */}
            {children.map((child) => renderTopPicks(child.name))}

            {/* Buttons */}
            <TouchableOpacity
              onPress={() => router.push("/choose-profile")}
              className="bg-[#60178b] mt-4 py-3 rounded-full items-center"
            >
              <Text className="text-white text-lg font-poppinsBold">
                Switch Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowLogoutConfirm(true)}
              className="bg-yellow-400 mt-4 py-3 rounded-full items-center mb-10"
            >
              <Text className="text-black text-lg font-poppinsBold">
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {selectedTab === "Settings" && <Settings />}
      </ScrollView>

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
              <Text className="text-black font-poppinsBold">Yes, log out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogoutConfirm(false)}>
              <Text className="text-gray-500 font-poppins text-sm underline">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

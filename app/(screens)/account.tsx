import { useState } from "react";
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
import { ChevronRight } from "lucide-react-native";
import VerifyAgePopup from "@/components/VerifyAgePopup";

const screenHeight = Dimensions.get("window").height;

const routes: Record<string, any> = {
  "Edit my profile": "/(screens)/edit-profile",
  "Edit my preference": "/(screens)/edit-preference",
  "Reading history": "/(screens)/reading-history",
  "Customise your theme": "/(screens)/customise-theme",
  "Change password": "/(screens)/change-password",
};

export default function ParentAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showVerifyAge, setShowVerifyAge] = useState(false);

  // Placeholder user values (since useUser was removed)
  const name = "Parent";
  const points = 100;

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setShowVerifyAge(true);
  };

  const handleVerifyComplete = (age: number) => {
    setShowVerifyAge(false);
    if (age < 18) {
      router.back();
    }
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-[#FFF2DF]"
        contentContainerStyle={{ paddingTop: insets.top + 20 }}
      >
        {/* Header */}
        <Text className="text-center text-4xl font-caprasimo text-purple-800">
          Profile
        </Text>

        {/* Profile Info */}
        <View className="items-center mt-6 mb-4">
          <View className="w-28 h-28 rounded-full border-4 border-black bg-white items-center justify-center mb-2 overflow-hidden">
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
              }}
              className="w-28 h-28 rounded-full"
              resizeMode="cover"
            />
          </View>
          <Text className="mt-2 mb-2 text-4xl font-caprasimo text-black">
            {name}
          </Text>
          <Text className="text-sm text-black mb-4">★ {points}</Text>
        </View>

        {/* Menu Section */}
        <View
          className="bg-white rounded-t-3xl px-8 pt-6 pb-10"
          style={{ minHeight: screenHeight - 250 }}
        >
          <View className="space-y-6">
            {Object.entries(routes).map(([title, path], index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(path)}
                className="flex-row justify-between items-center mb-5"
              >
                <View className="flex-row items-center space-x-3">
                  <View className="w-4 h-4 bg-purple-400 rounded-full mr-3" />
                  <Text className="text-base text-black font-poppins">
                    {title}
                  </Text>
                </View>
                <ChevronRight size={18} color="#333" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-yellow-400 mt-6 py-3 rounded-full items-center"
          >
            <Text className="text-black text-lg font-poppinsBold">Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
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
              <Text className="text-black font-poppinsBold">
                Yes, verify age
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogoutConfirm(false)}>
              <Text className="text-gray-500 font-poppins text-sm underline">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Verify Age Popup */}
      {showVerifyAge && (
        <VerifyAgePopup
          visible={showVerifyAge}
          onClose={() => setShowVerifyAge(false)}
        />
      )}
    </>
  );
}

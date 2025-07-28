// ChooseProfile.tsx (Option 1: Vertical Scroll)

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/utils/api/api";

export default function ChooseProfile() {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSelectProfile = async (profile: any) => {
    await AsyncStorage.setItem("selectedProfile", JSON.stringify(profile));
    router.push("/(tabs)");
  };

  const getAvatarUrl = (profile: { fullName: string; avatar?: string }) =>
    profile.avatar?.startsWith("http") && profile.avatar !== ""
      ? profile.avatar
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.fullName
        )}&background=random&color=fff&bold=true`;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) return;

        const res = await api.get("/profile");
        const rawProfiles = res.data?.data || [];

        const simplifiedProfiles = rawProfiles.map((profile: any) => ({
          id: profile.uuid,
          fullName: profile.fullName,
          avatar: profile.avatar,
        }));

        setProfiles(simplifiedProfiles);
      } catch (err) {
        console.error("Failed to fetch profiles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleContinue = () => {
    if (!selectedId) return;
    router.replace("/(tabs)");
  };

  const renderProfile = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => setSelectedId(item.id)}
      className="items-center w-[100px] self-center"
    >
      <Image
        source={{ uri: getAvatarUrl(item) }}
        className={`w-[80px] h-[80px] rounded-full mb-2 ${
          selectedId === item.id ? "border-4 border-[#D0EE30]" : ""
        }`}
        resizeMode="cover"
      />
      <Text className="text-white font-poppins text-[14px] text-center">
        {item.fullName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#60178b] items-center justify-center">
      {/* Background spiderwebs */}
      <Image
        source={require("@/assets/images/spider-web-1.png")}
        className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        resizeMode="cover"
      />
      <Image
        source={require("@/assets/images/spider-web-2.png")}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
        resizeMode="cover"
      />

      <View className="w-full max-w-[360px] items-center px-6">
        <Text className="text-[30px] font-caprasimo text-[#D0EE30] text-center mb-8">
          Who’s watching?
        </Text>

        <View className="h-[300px] w-full mb-6">
          {loading ? (
            <ActivityIndicator color="#D0EE30" size="large" />
          ) : (
            <FlatList
              data={[
                ...profiles,
                { id: "new", fullName: "Add Profile", avatar: null },
              ]}
              numColumns={3}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ gap: 20 }}
              columnWrapperStyle={{
                justifyContent: "space-evenly",
                marginBottom: 20,
              }}
              renderItem={({ item }) =>
                item.id === "new" ? (
                  <TouchableOpacity
                    onPress={() => router.push("/create-child-profile")}
                    className="items-center w-[100px] self-center"
                  >
                    <View className="w-[100px] h-[100px] rounded-full bg-[#60178b] justify-center items-center mb-2 border-[#D0EE30] border-[1px]">
                      <Text className="text-[#D0EE30] text-5xl">+</Text>
                    </View>
                    <Text className="text-white font-poppins text-[14px] text-center">
                      Add Profile
                    </Text>
                  </TouchableOpacity>
                ) : (
                  renderProfile({ item })
                )
              }
            />
          )}
        </View>

        <TouchableOpacity
          disabled={!selectedId}
          onPress={handleContinue}
          className={`py-3 px-10 rounded-xl w-full ${
            selectedId ? "bg-[#D0EE30]" : "bg-[#D0EE30]/40"
          }`}
        >
          <Text
            className={`font-poppinsBold text-[18px] text-center ${
              selectedId ? "text-[#60178b]" : "text-[#60178b]/50"
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(screens)/account/manage-profiles")}
          className="py-3 px-8 rounded-xl w-[50vw] justify-center mt-4 bg-[#60178b] border-white border-[1px] border-solid"
        >
          <Text className="font-poppins text-[13px] text-center text-white">
            Manage Profiles
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <Text className="text-white font-poppins text-sm text-center underline mt-4">
            Continue with parent account instead
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

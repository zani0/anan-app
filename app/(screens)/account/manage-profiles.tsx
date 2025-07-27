import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/utils/api/api";

type Profile = {
  id: string;
  name: string;
  avatar?: string;
};

export default function ManageProfiles() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const getAvatarUrl = (profile: Profile) =>
    profile.avatar?.startsWith("http") && profile.avatar !== ""
      ? profile.avatar
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.name
        )}&background=random&color=fff&bold=true`;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) return;
        const user = JSON.parse(userData);
        const res = await api.get("/profile");
        const rawProfiles = res.data;

        const simplifiedProfiles = rawProfiles.map((profile: any) => ({
          id: profile.id.toString(),
          name: profile.bio.fullName,
          avatar: profile.bio.avatar,
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

  return (
    <View className="flex-1 bg-[#60178b] relative">
      {/* Spiderwebs */}
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

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingVertical: 48,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-2xl p-6 py-16 shadow-md mb-6">
          <Text className="text-[30px] font-caprasimo text-[#6e1e9a] text-center mb-12">
            Manage Your Children Profiles
          </Text>

          {loading ? (
            <ActivityIndicator color="#D0EE30" size="large" />
          ) : (
            profiles.map((profile) => (
              <View
                key={profile.id}
                className="flex-row items-center justify-between mb-4 px-4 py-3 bg-white rounded-xl border-b border-[1px] border-gray-100"
              >
                <View className="flex-row items-center gap-4">
                  <Image
                    source={{ uri: getAvatarUrl(profile) }}
                    className="w-[40px] h-[40px] rounded-full"
                    resizeMode="cover"
                  />
                  <Text className="text-[#6e1e9a] font-poppins text-[16px]">
                    {profile.name}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    router.push("/(screens)/account/edit-child-profile")
                  }
                  className="bg-[#D0EE30] px-4 py-2 rounded-full"
                >
                  <Text className="text-[#60178b] font-poppins text-[14px]">
                    Manage
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
          <View className="flex-row justify-center gap-2">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="py-3 px-8 rounded-xl justify-center mt-6 bg-[#60178b] border-white border-[1px] border-solid self-center"
            >
              <Text className="font-poppinsBold text-[13px] text-white">
                Go Back
              </Text>
            </TouchableOpacity>

            {/* Add Profile */}
            <TouchableOpacity
              onPress={() => router.push("/create-child-profile")}
              className="mt-6 bg-[#D0EE30] py-3 px-6 rounded-xl self-center"
            >
              <Text className="text-[#60178b] font-poppinsBold text-[15px]">
                + Add Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

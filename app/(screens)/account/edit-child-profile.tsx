import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/utils/api/api";
import Header from "@/components/HeaderGoBack";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";
import { Switch } from "react-native";

export default function EditChildProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [readingLevel, setReadingLevel] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/profile/${id}`);
      const profile = res.data;
      setName(profile.bio.fullName);
      setNickName(profile.bio.nickName);
      setDob(profile.bio.dateOfBirth);
      setGender(profile.bio.gender);
      setPreferredLanguage(profile.bio.preferredLanguage);
      setReadingLevel(profile.bio.readingLevel);
      setAvatar(profile.bio.avatar);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
    });
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await api.put(`/profile/${id}`, {
        fullName: name,
        nickName,
        dateOfBirth: dob,
        gender,
        preferredLanguage,
        readingLevel,
        avatar,
      });
      showToast("success", "Profile updated successfully.");
      setTimeout(() => router.back(), 1000);
    } catch (err) {
      showToast("error", "Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    showToast("error", "Are you sure you want to delete this profile?");
    setTimeout(async () => {
      try {
        await api.delete(`/profile/${id}`);
        showToast("success", "Profile has been deleted.");
        setTimeout(
          () => router.replace("/(screens)/account/manage-profiles"),
          1000
        );
      } catch (err) {
        showToast("error", "Failed to delete profile.");
      }
    }, 1500);
  };

  const genderOptions = [
    { key: "GIRL", value: "Girl" },
    { key: "BOY", value: "Boy" },
  ];
  const languageOptions = [
    { key: "ENGLISH", value: "English" },
    { key: "FRENCH", value: "French" },
  ];
  const readingOptions = [
    { key: "BEGINNER", value: "Beginner" },
    { key: "INTERMEDIATE", value: "Intermediate" },
    { key: "ADVANCED", value: "Advanced" },
  ];

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#60178b]">
        <ActivityIndicator color="#D0EE30" size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 24 }}
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-12">
        <Header showProfilePicture={false} />
      </View>
      <Text className="text-[30px] font-caprasimo text-[#60178b] text-center mb-8">
        Edit Child Profile
      </Text>

      <TouchableOpacity onPress={pickImage} className="self-center mb-6">
        <Image
          source={{
            uri:
              avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name
              )}&background=random&color=fff&bold=true`,
          }}
          className="w-[120px] h-[120px] rounded-full"
          resizeMode="cover"
        />
        <Text className="text-[#60178b] text-center mt-2 font-poppinsBold">
          Change Picture
        </Text>
      </TouchableOpacity>

      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-[#60178b] font-poppinsBold mr-4 flex-1">
          Search (Keeps search bar on or off)
        </Text>
        <Switch
          value={isSearchEnabled}
          onValueChange={setIsSearchEnabled}
          thumbColor={isSearchEnabled ? "#60178b" : "#ccc"}
          trackColor={{ false: "#aaa", true: "#D0EE30" }}
        />
      </View>

      <View className="mb-4">
        <Text className="text-[#60178b] mb-1 font-poppinsBold">Full Name</Text>
        <TextInput
          className="bg-white border-[1px] border-[#60178b] rounded-lg px-4 py-3 text-[#60178b]"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-[#60178b] mb-1 font-poppinsBold">
          Date of Birth
        </Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          className="bg-white border-[1px] border-[#60178b] rounded-lg px-4 py-3 text-[#60178b]"
          value={dob}
          onChangeText={setDob}
        />
      </View>

      <View className="mb-4">
        <Text className="text-[#60178b] mb-1 font-poppinsBold">Gender</Text>
        <SelectList
          setSelected={setGender}
          data={genderOptions}
          save="key"
          defaultOption={{ key: gender, value: gender }}
        />
      </View>

      <View className="mb-4">
        <Text className="text-[#60178b] mb-1 font-poppinsBold">
          Preferred Language
        </Text>
        <SelectList
          setSelected={setPreferredLanguage}
          data={languageOptions}
          save="key"
          defaultOption={{ key: preferredLanguage, value: preferredLanguage }}
        />
      </View>

      <View className="mb-6">
        <Text className="text-[#60178b] mb-1 font-poppinsBold">
          Reading Level
        </Text>
        <SelectList
          setSelected={setReadingLevel}
          data={readingOptions}
          save="key"
          defaultOption={{ key: readingLevel, value: readingLevel }}
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-[#D0EE30] py-4 rounded-xl mb-4"
        disabled={submitting}
      >
        <Text className="text-[#60178b] font-poppinsBold text-center text-[16px]">
          {submitting ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDelete}
        className="bg-red-600 py-4 rounded-xl"
      >
        <Text className="text-white font-poppinsBold text-center text-[16px]">
          Delete Profile
        </Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
}

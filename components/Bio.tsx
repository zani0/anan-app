import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function BioScreen() {
  const router = useRouter();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [readingLevel, setReadingLevel] = useState("");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images], // fixed warning
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!name || !language || !readingLevel) {
      // Show styled popup or toast here
      return;
    }

    router.push("/(onboarding)/interests");
  };

  return (
    <ScrollView className="flex-1 bg-purple-100 px-4 py-8">
      <View className="bg-white rounded-2xl p-6 shadow-md">
        <Text className="text-2xl font-bold text-center mb-4 text-purple-600">
          Your Bio
        </Text>

        <TouchableOpacity
          className="items-center justify-center mb-6"
          onPress={handlePickImage}
        >
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              className="w-24 h-24 rounded-full border-4 border-purple-300"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-purple-100 border-4 border-purple-300 items-center justify-center">
              <Text className="text-purple-600 text-sm text-center">Tap to upload</Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="mb-4">
          <Text className="text-purple-600 mb-2">Name</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            className="border border-purple-300 rounded-xl px-4 py-3 text-base"
          />
        </View>

        <View className="mb-4">
          <Text className="text-purple-600 mb-2">Language</Text>
          <TextInput
            placeholder="e.g. English"
            placeholderTextColor="#aaa"
            value={language}
            onChangeText={setLanguage}
            className="border border-purple-300 rounded-xl px-4 py-3 text-base"
          />
        </View>

        <View className="mb-6">
          <Text className="text-purple-600 mb-2">Reading Level</Text>
          <TextInput
            placeholder="e.g. Beginner"
            placeholderTextColor="#aaa"
            value={readingLevel}
            onChangeText={setReadingLevel}
            className="border border-purple-300 rounded-xl px-4 py-3 text-base"
          />
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          className="bg-purple-500 rounded-xl py-4 flex-row items-center justify-center"
        >
          <Text className="text-white text-lg font-semibold mr-2">Continue</Text>
          <ChevronRight color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

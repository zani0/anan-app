// imports
import CategorySlider from "@/components/CategorySlider";
import Header from "@/components/HeaderGoBack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StoryCreatorForm() {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [incompleteModal, setIncompleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"book" | "character" | "story">("book");

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [pages, setPages] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [moral, setMoral] = useState("");
  const [ambientMusic, setAmbientMusic] = useState("");
  const [species, setSpecies] = useState("");
  const [traits, setTraits] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const languages = [
    { key: "english", value: "English" },
    { key: "twi", value: "Twi" },
    { key: "ewe", value: "Ewe" },
  ];

  const categories = [
    { key: "adventure", value: "Adventure" },
    { key: "moral", value: "Moral" },
    { key: "fantasy", value: "Fantasy" },
    { key: "mystery", value: "Mystery" },
  ];

  const pageOptions = [
    { key: "short", value: "1-3 Pages" },
    { key: "medium", value: "4-7 Pages" },
    { key: "long", value: "8+ Pages" },
  ];

  const genders = [
    { key: "boy", value: "Boy" },
    { key: "girl", value: "Girl" },
    { key: "other", value: "Other" },
  ];

  const ageOptions = [
    { key: "3-5", value: "3-5" },
    { key: "6-8", value: "6-8" },
    { key: "9-12", value: "9-12" },
  ];

  const inputClass =
    "border border-purple-300 text-[#60178b] bg-[#fdf9ff] rounded-xl px-4 py-3 text-base shadow-sm mb-4 font-poppins";

  const dropdownBoxStyles = {
    backgroundColor: "#fdf9ff",
    borderColor: "#d6bbf5",
    borderRadius: 14,
    paddingVertical: 12,
  };

  const handleGenerate = async () => {
    const isComplete =
      title &&
      language &&
      selectedCategories.length > 0 &&
      pages &&
      characterName &&
      gender &&
      age &&
      description &&
      moral &&
      species &&
      traits;

    if (!isComplete) {
      setIncompleteModal(true);
      return;
    }

    setLoading(true);

    const payload = {
      story: {
        prompt: description,
        moral,
      },
      book: {
        title,
        language:
          (language as string).charAt(0).toUpperCase() +
          (language as string).slice(1),
        numberOfPages: pages === "short" ? 3 : pages === "medium" ? 5 : 8,
        images: "illustrations",
        readingLevel: "Emergent",
        category: selectedCategories.map((cat) => cat.toUpperCase()),
        ambientMusic: ambientMusic || "soothing",
      },
      mainCharacter: {
        name: characterName,
        gender:
          gender === "boy" ? "male" : gender === "girl" ? "female" : "other",
        age: age === "3-5" ? 4 : age === "6-8" ? 7 : 10,
        species,
        traits,
      },
      reference: "tesaskklstsdk2jj4",
    };

    const token = await AsyncStorage.getItem("token");

    try {
      const response = await fetch(
        "https://anansesem.onrender.com/api/v1/generate-story/4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Generated story:", data);
      } else {
        console.error("API error:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Loading Modal */}
      <Modal transparent visible={loading} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white px-6 py-8 rounded-3xl items-center w-4/5 shadow-xl">
            <Image
              source={require("@/assets/images/avatar.png")}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-[#5D1889] font-caprasimo text-2xl mb-2 text-center">
              Hold on, Ananse is generating your story...
            </Text>
            <ActivityIndicator size="large" color="#5D1889" />
          </View>
        </View>
      </Modal>

      {/* Incomplete Modal */}
      <Modal transparent visible={incompleteModal} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white px-6 py-8 rounded-3xl items-center w-4/5 shadow-xl">
            <Image
              source={require("@/assets/images/avatar.png")}
              className="w-20 h-20 mb-4"
              resizeMode="contain"
            />
            <Text className="text-[#5D1889] font-caprasimo text-xl mb-2 text-center">
              Please complete all fields
            </Text>
            <TouchableOpacity
              onPress={() => setIncompleteModal(false)}
              className="mt-4 bg-[#5D1889] rounded-full px-6 py-3"
            >
              <Text className="text-white font-poppinsBold">Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header and Category */}
      <View className="mx-6">
        <Header />
        <CategorySlider />
      </View>

      <ScrollView className="px-5 py-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="mt-6">
          <View className="bg-[#5D1889] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[50vw]">
            <Text className="text-white font-poppinsBold text-base">Create your own story</Text>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          className="mt-4 mb-4 pb-6"
        >
          {[
            { key: "book", label: "Story Info", image: require("@/assets/images/vid.png") },
            { key: "character", label: "Create a character", image: require("@/assets/images/char.png") },
            { key: "story", label: "Create a book", image: require("@/assets/images/story.png") },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              className={`w-32 h-36 items-center justify-around p-4 rounded-2xl border-[#60178b] border-[1px] ${
                activeTab === tab.key ? "bg-[#d5ff32]" : "bg-white"
              }`}
            >
              <Image source={tab.image} className="w-12 h-12" resizeMode="contain" />
              <Text className="text-center font-poppinsBold text-[#5D1889] text-[12px]">{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Book Tab */}
        {activeTab === "book" && (
          <>
            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2">What is the title of your book?</Text>
            <TextInput placeholder="Book Title" value={title} onChangeText={setTitle} className={inputClass} />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Language?</Text>
            <SelectList data={languages} setSelected={setLanguage} boxStyles={dropdownBoxStyles} placeholder="Select Language" save="key" />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Select categories</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {categories.map((cat) => {
                const selected = selectedCategories.includes(cat.key);
                return (
                  <TouchableOpacity
                    key={cat.key}
                    onPress={() => {
                      setSelectedCategories((prev) =>
                        selected ? prev.filter((c) => c !== cat.key) : [...prev, cat.key]
                      );
                    }}
                    className={`px-4 py-2 rounded-full border ${
                      selected ? "bg-[#5D1889] border-[#5D1889]" : "bg-white border-gray-300"
                    }`}
                  >
                    <Text className={`font-poppins ${selected ? "text-white" : "text-[#5D1889]"}`}>
                      {cat.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2">Number of Pages?</Text>
            <SelectList data={pageOptions} setSelected={setPages} boxStyles={dropdownBoxStyles} placeholder="Number of Pages" save="key" />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Ambient Music (URL or keyword)</Text>
            <TextInput placeholder="e.g. relaxing-music.mp3" value={ambientMusic} onChangeText={setAmbientMusic} className={inputClass} />
          </>
        )}

        {/* Character Tab */}
        {activeTab === "character" && (
          <>
            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2">Character Name?</Text>
            <TextInput placeholder="Character Name" value={characterName} onChangeText={setCharacterName} className={inputClass} />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Gender?</Text>
            <SelectList data={genders} setSelected={setGender} boxStyles={dropdownBoxStyles} placeholder="Gender" save="key" />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Age Group?</Text>
            <SelectList data={ageOptions} setSelected={setAge} boxStyles={dropdownBoxStyles} placeholder="Age" save="key" />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Species?</Text>
            <TextInput placeholder="e.g. elf, human, dwarf" value={species} onChangeText={setSpecies} className={inputClass} />

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">Traits?</Text>
            <TextInput placeholder="e.g. brave, kind, evil" value={traits} onChangeText={setTraits} className={inputClass} />
          </>
        )}

        {/* Story Tab */}
        {activeTab === "story" && (
          <>
            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2">What is your story about?</Text>
            <TextInput
              placeholder="Describe and narrate your story"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              maxLength={5000}
              className="rounded-xl bg-[#fdf9ff] border border-purple-300 px-4 py-4 text-base font-poppins shadow-sm mb-2"
              style={{ minHeight: 160 }}
            />
            <Text className="text-right text-sm text-gray-500 mb-6">{description.length}/5000 Characters</Text>

            <Text className="text-[#5D1889] text-lg font-poppinsBold mb-2 mt-4">What is the moral of your story?</Text>
            <TextInput placeholder="e.g. Elvis still loved his friends" value={moral} onChangeText={setMoral} className={inputClass} />
          </>
        )}

        <TouchableOpacity onPress={handleGenerate} className="bg-[#d5ff32] rounded-full py-4 mb-4 w-full mt-6">
          <Text className="text-center text-[#5D1889] text-lg font-poppinsBold">Generate</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// imports (same as before)
import CategorySlider from "@/components/CategorySlider";
import Header from "@/components/HeaderGoBack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  LogBox,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StoryCreatorForm() {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [incompleteModal, setIncompleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"book" | "character" | "story">(
    "book"
  );

  // dropdown states (same as before)
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);
  const [languages, setLanguages] = useState([
    { label: "English", value: "english" },
    { label: "Twi", value: "twi" },
    { label: "Ewe", value: "ewe" },
  ]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { label: "Adventure", value: "adventure" },
    { label: "Moral", value: "moral" },
    { label: "Fantasy", value: "fantasy" },
  ]);

  const [pagesOpen, setPagesOpen] = useState(false);
  const [pages, setPages] = useState<string | null>(null);
  const [pageOptions, setPageOptions] = useState([
    { label: "1-3 Pages", value: "short" },
    { label: "4-7 Pages", value: "medium" },
    { label: "8+ Pages", value: "long" },
  ]);

  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [genders, setGenders] = useState([
    { label: "Boy", value: "boy" },
    { label: "Girl", value: "girl" },
    { label: "Other", value: "other" },
  ]);

  const [ageOpen, setAgeOpen] = useState(false);
  const [age, setAge] = useState<string | null>(null);
  const [ageOptions, setAgeOptions] = useState([
    { label: "3-5", value: "3-5" },
    { label: "6-8", value: "6-8" },
    { label: "9-12", value: "9-12" },
  ]);

  const [title, setTitle] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [description, setDescription] = useState("");

  const inputClass =
    "border border-purple-300 bg-[#fdf9ff] rounded-xl px-4 py-3 text-base shadow-sm mb-4";

  const dropdownStyle = {
    marginBottom: 20,
    borderColor: "#d6bbf5",
    borderRadius: 14,
    backgroundColor: "#fdf9ff",
    shadowColor: "#c79df7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  };

  const handleGenerate = async () => {
    const isComplete =
      title &&
      language &&
      category &&
      pages &&
      characterName &&
      gender &&
      age &&
      description;

    if (!isComplete) {
      setIncompleteModal(true);
      return;
    }

    setLoading(true);

    const payload = {
      story: {
        prompt: description,
        moral: "Elvis still loved his friends",
      },
      book: {
        title,
        language:
          (language as string).charAt(0).toUpperCase() +
          (language as string).slice(1),
        numberOfPages: pages === "short" ? 3 : pages === "medium" ? 5 : 8,
        images: "illustrations",
        readingLevel: "Emergent",
        category: [category?.toUpperCase() || "ADVENTURE"],
        ambientMusic: "soothing",
      },
      mainCharacter: {
        name: characterName,
        gender:
          gender === "boy" ? "male" : gender === "girl" ? "female" : "other",
        age: age === "3-5" ? 4 : age === "6-8" ? 7 : 10,
        species: "human",
        traits: "brave",
      },
      reference: "tesaskklsdk2jj4",
    };

    try {
      const response = await fetch(
        "https://anansesem.onrender.com/api/v1/generate-story/4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Generated story:", data);
        // TODO: Navigate to story preview
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
      {/* Modals (same as before) */}
      <Modal transparent visible={loading} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white px-6 py-8 rounded-3xl items-center w-4/5 shadow-xl">
            <Image
              source={require("@/assets/images/avatar.png")}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-[#5a1786] font-caprasimo text-2xl mb-2 text-center">
              Hold on, Ananse is generating your story...
            </Text>
            <ActivityIndicator size="large" color="#5a1786" />
          </View>
        </View>
      </Modal>

      <Modal transparent visible={incompleteModal} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white px-6 py-8 rounded-3xl items-center w-4/5 shadow-xl">
            <Image
              source={require("@/assets/images/avatar.png")}
              className="w-20 h-20 mb-4"
              resizeMode="contain"
            />
            <Text className="text-[#5a1786] font-caprasimo text-xl mb-2 text-center">
              Please complete all fields
            </Text>
            <TouchableOpacity
              onPress={() => setIncompleteModal(false)}
              className="mt-4 bg-[#5a1786] rounded-full px-6 py-3"
            >
              <Text className="text-white font-poppinsBold">Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="mx-6">
        <Header />
        <CategorySlider />
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around mt-4">
        {["book", "character", "story"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            className={`py-2 px-4 rounded-full ${
              activeTab === tab ? "bg-[#5a1786]" : "bg-purple-100"
            }`}
          >
            <Text
              className={`font-poppinsBold ${
                activeTab === tab ? "text-white" : "text-[#5a1786]"
              }`}
            >
              {tab === "book"
                ? "Book Info"
                : tab === "character"
                ? "Character Info"
                : "Story Prompt"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        className="px-5 py-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {activeTab === "book" && (
          <>
            <TextInput
              placeholder="Book Title"
              value={title}
              onChangeText={setTitle}
              className={inputClass}
            />
            <DropDownPicker
              open={languageOpen}
              value={language}
              items={languages}
              setOpen={setLanguageOpen}
              setValue={setLanguage}
              setItems={setLanguages}
              placeholder="Select Language"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
              zIndex={5000}
            />
            <DropDownPicker
              open={categoryOpen}
              value={category}
              items={categories}
              setOpen={setCategoryOpen}
              setValue={setCategory}
              setItems={setCategories}
              placeholder="Select Category"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
              zIndex={4000}
            />
            <DropDownPicker
              open={pagesOpen}
              value={pages}
              items={pageOptions}
              setOpen={setPagesOpen}
              setValue={setPages}
              setItems={setPageOptions}
              placeholder="Number of Pages"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
              zIndex={3000}
            />
          </>
        )}

        {activeTab === "character" && (
          <>
            <TextInput
              placeholder="Character Name"
              value={characterName}
              onChangeText={setCharacterName}
              className={inputClass}
            />
            <DropDownPicker
              open={genderOpen}
              value={gender}
              items={genders}
              setOpen={setGenderOpen}
              setValue={setGender}
              setItems={setGenders}
              placeholder="Gender"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
              zIndex={2000}
            />
            <DropDownPicker
              open={ageOpen}
              value={age}
              items={ageOptions}
              setOpen={setAgeOpen}
              setValue={setAge}
              setItems={setAgeOptions}
              placeholder="Age"
              style={dropdownStyle}
              dropDownContainerStyle={dropdownStyle}
              zIndex={1000}
            />
          </>
        )}

        {activeTab === "story" && (
          <>
            <Text className="text-[#5a1786] text-lg font-poppinsBold mb-2">
              What is your story about?
            </Text>
            <TextInput
              placeholder="Describe and narrate your story"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              maxLength={5000}
              className="rounded-xl bg-[#fdf9ff] border border-purple-300 px-4 py-4 text-base shadow-sm mb-2"
              style={{ minHeight: 160 }}
            />
            <Text className="text-right text-sm text-gray-500 mb-6">
              {description.length}/5000 Characters
            </Text>
          </>
        )}
        <TouchableOpacity
          onPress={handleGenerate}
          className="bg-[#d5ff32] rounded-full py-4 mb-4 w-full"
        >
          <Text className="text-center text-[#5a1786] text-lg font-poppinsBold">
            Generate
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

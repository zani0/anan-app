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

// Silence VirtualizedList warning from DropDownPicker
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function StoryCreatorForm() {
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [incompleteModal, setIncompleteModal] = useState(false);

  // Dropdown states...
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(null);
  const [languages, setLanguages] = useState([
    { label: "English", value: "english" },
    { label: "Twi", value: "twi" },
    { label: "Ewe", value: "ewe" },
  ]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: "Adventure", value: "adventure" },
    { label: "Moral", value: "moral" },
    { label: "Fantasy", value: "fantasy" },
  ]);

  const [pagesOpen, setPagesOpen] = useState(false);
  const [pages, setPages] = useState(null);
  const [pageOptions, setPageOptions] = useState([
    { label: "1-3 Pages", value: "short" },
    { label: "4-7 Pages", value: "medium" },
    { label: "8+ Pages", value: "long" },
  ]);

  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genders, setGenders] = useState([
    { label: "Boy", value: "boy" },
    { label: "Girl", value: "girl" },
    { label: "Other", value: "other" },
  ]);

  const [ageOpen, setAgeOpen] = useState(false);
  const [age, setAge] = useState(null);
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

  const handleGenerate = () => {
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
    setTimeout(() => {
      setLoading(false);
      // Navigate or show results here...
    }, 3000);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Loader Modal */}
      <Modal transparent visible={loading} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white px-6 py-8 rounded-3xl items-center w-4/5 shadow-xl">
            <Image
              source={require("@/assets/images/avatar.png")}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-[#5a1786] font-caprasimo text-2xl mb-2 text-center">
              Ananse is creating your story...
            </Text>
            <ActivityIndicator size="large" color="#5a1786" />
          </View>
        </View>
      </Modal>

      {/* Incomplete Fields Modal */}
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

      {/* Header */}
      <View className="mx-6">
        <Header />
      </View>

      <ScrollView
        className="px-5 py-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
      >
        <View className="justify-between items-center px-4 py-3 bg-white rounded-b-3xl">
          <Text className="text-4xl text-[#5a1786] font-caprasimo">
            AI Story Creator
          </Text>
          <Text className="text-base text-black text-center font-poppins mt-2">
            Your story will be generated based on the options you select in the
            following 3 categories
          </Text>
        </View>

        {/* Book Info */}
        <View className="mb-3 mt-4 flex-row items-center">
          <View className="w-4 h-4 rounded-full bg-purple-300 mr-4" />
          <Text className="text-[#5a1786] font-poppinsBold text-xl">
            Book Info
          </Text>
        </View>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          className={inputClass}
        />

        <View style={{ zIndex: 5000 }}>
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
          />
        </View>

        <View style={{ zIndex: 4000 }}>
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
          />
        </View>

        <View style={{ zIndex: 3000 }}>
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
          />
        </View>

        {/* Character Info */}
        <View className="mb-3 mt-4 flex-row items-center">
          <View className="w-4 h-4 rounded-full bg-purple-300 mr-4" />
          <Text className="text-[#5a1786] font-poppinsBold text-xl">
            Character Info
          </Text>
        </View>

        <TextInput
          placeholder="Character Name"
          value={characterName}
          onChangeText={setCharacterName}
          className={inputClass}
        />

        <View style={{ zIndex: 2000 }}>
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
          />
        </View>

        <View style={{ zIndex: 1000 }}>
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
          />
        </View>

        {/* Description */}
        <View className="mb-3 mt-4 flex-row items-center">
          <View className="w-4 h-4 rounded-full bg-purple-300 mr-4" />
          <Text className="text-[#5a1786] font-poppinsBold text-xl">
            Describe Your Story
          </Text>
        </View>
        <TextInput
          placeholder="Describe your story idea..."
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
          className="border border-purple-300 bg-[#fdf9ff] rounded-xl px-4 py-3 text-base shadow-sm mb-6"
          style={{ minHeight: 160 }}
        />

        {/* Button */}
        <TouchableOpacity
          onPress={handleGenerate}
          className="bg-[#60178b] rounded-full py-4 mb-10"
        >
          <Text className="text-white text-center text-lg font-poppinsBold">
            Generate Story
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

import Header from "@/components/HeaderGoBack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StoryCreatorForm() {
  const insets = useSafeAreaInsets();

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

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingTop: insets.top,
        paddingBottom: 80,
      }}
    >
      <Header />
      <View className="justify-between items-center px-4 py-3 bg-white rounded-b-3xl">
        <Text className="text-4xl text-purple-700 font-caprasimo">
          AI Story Creator
        </Text>
        <Text className="text-base text-black text-center font-poppins mt-2">
          Your story will be generated based on the options you select in the
          following 3 categories
        </Text>
      </View>
      <ScrollView className="px-5 py-4">
        {/* Book Info Section */}
        <Text className="text-purple-800 font-poppinsBold text-xl mb-3">
          📘 Book Info
        </Text>

        <TextInput
          placeholder="Title"
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
          zIndex={3000}
        />

        {/* Character Info Section */}
        <Text className="text-purple-800 font-poppinsBold text-xl mt-6 mb-3">
          🧒 Character Info
        </Text>

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
          zIndex={1000}
        />

        {/* Story Prompt */}
        <Text className="text-purple-800 font-poppinsBold text-xl mt-6 mb-3">
          ✨ Describe Your Story
        </Text>
        <TextInput
          placeholder="Describe your story idea..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          className="border border-purple-300 bg-[#fdf9ff] rounded-xl px-4 py-3 text-base shadow-sm mb-6"
        />

        {/* Generate Button */}
        <TouchableOpacity className="bg-[#60178b] rounded-full py-4">
          <Text className="text-white text-center text-lg font-poppinsBold">
            💡 Generate Story
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

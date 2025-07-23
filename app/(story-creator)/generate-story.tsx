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
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{
        paddingTop: insets.top + 0,
        paddingBottom: 80,
      }}
    >
      <Header />
      <ScrollView className="px-4 py-4 bg-white">
        {/* Book Details */}
        <Text className="text-purple-800 font-poppinsBold text-lg mb-2">
          Book Info
        </Text>
        <View className="mb-4">
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            className="border border-purple-300 bg-gray-50 rounded-lg px-4 py-2 mb-3"
          />

          <DropDownPicker
            open={languageOpen}
            value={language}
            items={languages}
            setOpen={setLanguageOpen}
            setValue={setLanguage}
            setItems={setLanguages}
            placeholder="Select Language"
            style={{ marginBottom: languageOpen ? 100 : 15 }}
          />

          <DropDownPicker
            open={categoryOpen}
            value={category}
            items={categories}
            setOpen={setCategoryOpen}
            setValue={setCategory}
            setItems={setCategories}
            placeholder="Select Category"
            style={{ marginBottom: categoryOpen ? 100 : 15 }}
          />

          <DropDownPicker
            open={pagesOpen}
            value={pages}
            items={pageOptions}
            setOpen={setPagesOpen}
            setValue={setPages}
            setItems={setPageOptions}
            placeholder="Number of Pages"
            style={{ marginBottom: pagesOpen ? 100 : 15 }}
          />
        </View>

        {/* Character Details */}
        <Text className="text-purple-800 font-poppinsBold text-lg mb-2">
          Character Info
        </Text>
        <View className="mb-4">
          <TextInput
            placeholder="Character Name"
            value={characterName}
            onChangeText={setCharacterName}
            className="border border-purple-300 bg-gray-50 rounded-lg px-4 py-2 mb-3"
          />

          <DropDownPicker
            open={genderOpen}
            value={gender}
            items={genders}
            setOpen={setGenderOpen}
            setValue={setGender}
            setItems={setGenders}
            placeholder="Gender"
            style={{ marginBottom: genderOpen ? 100 : 15 }}
          />

          <DropDownPicker
            open={ageOpen}
            value={age}
            items={ageOptions}
            setOpen={setAgeOpen}
            setValue={setAge}
            setItems={setAgeOptions}
            placeholder="Age"
            style={{ marginBottom: ageOpen ? 100 : 15 }}
          />
        </View>

        {/* Story Prompt */}
        <Text className="text-purple-800 font-poppinsBold text-lg mb-2">
          Describe Your Story
        </Text>
        <TextInput
          placeholder="Describe your story idea..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          className="border border-purple-300 bg-gray-50 rounded-lg px-4 py-2 mb-6 text-base"
        />

        {/* Generate Button */}
        <TouchableOpacity className="bg-[#60178b] rounded-full py-3">
          <Text className="text-white text-center text-lg font-poppinsBold">
            Generate Story
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

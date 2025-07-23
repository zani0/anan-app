import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import Header from "@/components/HeaderGoBack";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function StoryCreator() {
  const insets = useSafeAreaInsets();

  // Dropdown toggles
  const [openBook, setOpenBook] = useState(true);
  const [openCharacter, setOpenCharacter] = useState(false);
  const [openStory, setOpenStory] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState("");
  const [charName, setCharName] = useState("");
  const [charGender, setCharGender] = useState("");
  const [charAge, setCharAge] = useState("");
  const [storyDesc, setStoryDesc] = useState("");

  const toggleSection = (section: string) => {
    LayoutAnimation.easeInEaseOut();
    setOpenBook(section === "book" ? !openBook : false);
    setOpenCharacter(section === "character" ? !openCharacter : false);
    setOpenStory(section === "story" ? !openStory : false);
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: insets.top }}
      className="px-4"
    >
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="justify-between items-center px-4 py-3 bg-white rounded-b-3xl">
          <Text className="text-4xl text-purple-700 font-caprasimo">
            AI Story Creator
          </Text>
          <Text className="text-base text-black text-center font-poppins mt-2">
            Your story will be generated based on the options you select in the
            following 3 categories
          </Text>
        </View>

        {/* Dropdown Section - Book */}
        <TouchableOpacity
          onPress={() => toggleSection("book")}
          className="mt-6 bg-purple-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
        >
          <Text className="text-purple-800 font-poppinsBold text-lg">
            📚 Book
          </Text>
          {openBook ? <ChevronUp color="#60178b" /> : <ChevronDown color="#60178b" />}
        </TouchableOpacity>
        {openBook && (
          <View className="mt-4 space-y-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Book title"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
            <TextInput
              value={language}
              onChangeText={setLanguage}
              placeholder="Language"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Category"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
            <TextInput
              value={pages}
              onChangeText={setPages}
              placeholder="Number of pages"
              keyboardType="numeric"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
          </View>
        )}

        {/* Dropdown Section - Character */}
        <TouchableOpacity
          onPress={() => toggleSection("character")}
          className="mt-6 bg-purple-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
        >
          <Text className="text-purple-800 font-poppinsBold text-lg">
            👧 Character
          </Text>
          {openCharacter ? <ChevronUp color="#60178b" /> : <ChevronDown color="#60178b" />}
        </TouchableOpacity>
        {openCharacter && (
          <View className="mt-4 space-y-4">
            <TextInput
              value={charName}
              onChangeText={setCharName}
              placeholder="Character name"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
            <TextInput
              value={charGender}
              onChangeText={setCharGender}
              placeholder="Gender"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
            <TextInput
              value={charAge}
              onChangeText={setCharAge}
              placeholder="Age"
              keyboardType="numeric"
              className="border border-purple-300 px-4 py-2 rounded-lg"
            />
          </View>
        )}

        {/* Dropdown Section - Story */}
        <TouchableOpacity
          onPress={() => toggleSection("story")}
          className="mt-6 bg-purple-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
        >
          <Text className="text-purple-800 font-poppinsBold text-lg">
            ✨ Story
          </Text>
          {openStory ? <ChevronUp color="#60178b" /> : <ChevronDown color="#60178b" />}
        </TouchableOpacity>
        {openStory && (
          <View className="mt-4">
            <TextInput
              value={storyDesc}
              onChangeText={setStoryDesc}
              placeholder="Describe your story idea..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="border border-purple-300 px-4 py-3 rounded-lg"
            />
          </View>
        )}

        {/* Generate Button */}
        <TouchableOpacity className="mt-8 bg-purple-700 py-4 rounded-xl">
          <Text className="text-center text-white font-poppinsBold text-lg">
            Generate Story
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

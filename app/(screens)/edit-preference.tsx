import Header from "@/components/Header";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("window").height;

const genres = [
  "African Folklore",
  "Egyptian Tales",
  "Fantasy",
  "Adventure",
  "Sci-fi",
  "Mystery",
];

const learningStyles = ["Visual", "Logical", "Special Needs", "Auditory", "Kinesthetic"];
const characterPrefs = ["Superheroes", "Animals", "Everyday Kids", "Royalty", "Aliens"];

const Pill = ({
  label,
  selected,
  onPress,
  outlineColor,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  outlineColor: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderRadius: 9999,
        marginBottom: 12,
        marginRight: 12,
        backgroundColor: selected ? "#9333EA" : "transparent",
        borderColor: selected ? "#9333EA" : outlineColor,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: selected ? "white" : outlineColor,
          fontFamily: "Poppins_400Regular",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function EditPreferences() {
  const insets = useSafeAreaInsets();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLearningStyles, setSelectedLearningStyles] = useState<string[]>([]);
  const [selectedCharacterPrefs, setSelectedCharacterPrefs] = useState<string[]>([]);

  const toggleSelect = (
    item: string,
    selectedList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(
      selectedList.includes(item)
        ? selectedList.filter((i) => i !== item)
        : [...selectedList, item]
    );
  };

  const handleSubmit = () => {
    console.log("Genres:", selectedGenres);
    console.log("Learning Styles:", selectedLearningStyles);
    console.log("Character Preferences:", selectedCharacterPrefs);
  };

  return (
    <ScrollView
      className="flex-1 bg-white px-6"
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 60 }}
    >
      <Header />
      {/* Header */}
      <Text className="text-center text-4xl font-caprasimo text-purple-800 mb-8">
        Let's get to know you
      </Text>

      {/* Section 1: Genres */}
      <Text className="text-lg text-black font-poppinsBold mb-2">
        What story genres do you like?
      </Text>
      <View className="flex-row flex-wrap mb-8">
        {genres.map((genre, index) => (
          <Pill
            key={index}
            label={genre}
            selected={selectedGenres.includes(genre)}
            onPress={() => toggleSelect(genre, selectedGenres, setSelectedGenres)}
            outlineColor="#6366F1" // indigo
          />
        ))}
      </View>

      {/* Section 2: Learning Style */}
      <Text className="text-lg text-black font-poppinsBold mb-2">
        What is your learning style?
      </Text>
      <View className="flex-row flex-wrap mb-8">
        {learningStyles.map((style, index) => (
          <Pill
            key={index}
            label={style}
            selected={selectedLearningStyles.includes(style)}
            onPress={() =>
              toggleSelect(style, selectedLearningStyles, setSelectedLearningStyles)
            }
            outlineColor="#EAB308" // yellow
          />
        ))}
      </View>

      {/* Section 3: Character Preferences */}
      <Text className="text-lg text-black font-poppinsBold mb-2">
        What are your character preferences?
      </Text>
      <View className="flex-row flex-wrap mb-12">
        {characterPrefs.map((pref, index) => (
          <Pill
            key={index}
            label={pref}
            selected={selectedCharacterPrefs.includes(pref)}
            onPress={() =>
              toggleSelect(pref, selectedCharacterPrefs, setSelectedCharacterPrefs)
            }
            outlineColor="#10B981" 
          />
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-purple-700 py-4 rounded-full items-center"
      >
        <Text className="text-white font-poppinsBold text-lg">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

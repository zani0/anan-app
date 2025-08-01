import Header from "@/components/HeaderGoBack";
import Preferences from "@/components/Preferences";
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
      <Preferences />
    </ScrollView>
  );
}

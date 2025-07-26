import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const purple = "#60178b";
const yellow = "#D0EE30";
const green = "#2ecc71";

const interests = [
  "Animals", "Magic", "Sports", "Adventure", "Science", "Art", "Space"
];

const learningStyles = [
  "Visual", "Logical", "Linguistic", "Informational", "Egyptian Tales", "Sound"
];

const storyGenres = [
  "Fairy Tales", "Mystery", "Adventure", "Folktales", "Funny", "Historical", "Fantasy", "Realistic Fiction"
];

const Pill = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full border mr-2 mb-3 ${
      selected ? "bg-[#2ecc71]" : "bg-white"
    }`}
    style={{
      borderColor: purple,
    }}
  >
    <Text style={{ color: selected ? "white" : purple, fontWeight: "600" }}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function ChoosePreferences({ navigation }: any) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    selectedList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedList.includes(item)) {
      setList(selectedList.filter((i) => i !== item));
    } else if (selectedList.length < 3) {
      setList([...selectedList, item]);
    }
  };

  const canProceed =
    (step === 1 && selectedInterests.length >= 3) ||
    (step === 2 && selectedStyles.length >= 3) ||
    (step === 3 && selectedGenres.length >= 3);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences or navigate
      navigation.navigate("NextScreen");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text className="text-[20px] font-bold text-[#60178b] mb-2 text-center">
              What is your child interested in?
            </Text>
            <Text className="text-center text-gray-600 mb-4">
              Select as many that apply (up to 3)
            </Text>
            <View className="flex-row flex-wrap">
              {interests.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  selected={selectedInterests.includes(item)}
                  onPress={() =>
                    toggleSelection(item, selectedInterests, setSelectedInterests)
                  }
                />
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-[20px] font-bold text-[#60178b] mb-2 text-center">
              What is your child’s learning style?
            </Text>
            <View className="flex-row flex-wrap">
              {learningStyles.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  selected={selectedStyles.includes(item)}
                  onPress={() =>
                    toggleSelection(item, selectedStyles, setSelectedStyles)
                  }
                />
              ))}
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-[20px] font-bold text-[#60178b] mb-2 text-center">
              What story genres does your child like?
            </Text>
            <View className="flex-row flex-wrap">
              {storyGenres.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  selected={selectedGenres.includes(item)}
                  onPress={() =>
                    toggleSelection(item, selectedGenres, setSelectedGenres)
                  }
                />
              ))}
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-[#60178b] px-6 pt-20">
      <Image
        source={require("@/assets/images/spider-web-1.png")}
        className="w-[150px] h-[120px] absolute top-[-20px] right-[-30px]"
      />
      <Image
        source={require("@/assets/images/spider-web-2.png")}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white p-6 rounded-2xl w-full space-y-4">
          {renderStep()}

          <TouchableOpacity
            disabled={!canProceed}
            onPress={handleNext}
            className={`py-3 mt-6 rounded-xl ${
              canProceed ? "bg-[#D0EE30]" : "bg-gray-300"
            }`}
          >
            <Text
              className={`text-center font-poppinsBold text-[18px] ${
                canProceed ? "text-[#60178b]" : "text-gray-600"
              }`}
            >
              {step < 3 ? "Next" : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

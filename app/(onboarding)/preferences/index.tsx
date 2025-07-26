import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const purple = "#60178b";
const yellow = "#D0EE30";

const interests = ["Animals", "Magic", "Sports", "Adventure", "Science", "Art", "Space"];
const learningStyles = ["Visual", "Logical", "Linguistic", "Informational", "Egyptian Tales", "Sound"];
const storyGenres = ["Fairy Tales", "Mystery", "Adventure", "Folktales", "Funny", "Historical", "Fantasy", "Realistic Fiction"];

const Pill = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full border mr-2 mb-3 ${selected ? "bg-[#D0EE30]" : "bg-white"}`}
    style={{ borderColor: purple }}
  >
    <Text style={{ color: purple, fontWeight: "600" }}>{label}</Text>
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
    } else {
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
      navigation.navigate("NextScreen");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text className="text-[20px] font-bold text-[#60178b] mb-4 text-center">
              What is your child interested in?
            </Text>
            <View className="flex-row flex-wrap">
              {interests.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  selected={selectedInterests.includes(item)}
                  onPress={() => toggleSelection(item, selectedInterests, setSelectedInterests)}
                />
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-[20px] font-bold text-[#60178b] mb-4 text-center">
              What is your child’s learning style?
            </Text>
            <View className="flex-row flex-wrap">
              {learningStyles.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  selected={selectedStyles.includes(item)}
                  onPress={() => toggleSelection(item, selectedStyles, setSelectedStyles)}
                />
              ))}
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-[20px] font-bold text-[#60178b] mb-4 text-center">
              What story genres does your child like?
            </Text>
            <View className="flex-row flex-wrap">
              {storyGenres.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  selected={selectedGenres.includes(item)}
                  onPress={() => toggleSelection(item, selectedGenres, setSelectedGenres)}
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
      <Image source={require("@/assets/images/spider-web-1.png")} className="w-[150px] h-[120px] absolute top-[-20px] right-[-30px]" />
      <Image source={require("@/assets/images/spider-web-2.png")} className="w-[170px] h-[80px] absolute bottom-0 left-0" />

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} showsVerticalScrollIndicator={false}>
        <Text className="text-[30px] font-caprasimo text-[#D0EE30] text-center mb-4">
          What is your child interested in?
        </Text>
        <Text className="font-poppins text-white text-base text-center mb-8">
          Select at least 3 options. You can pick as many as you'd like!
        </Text>

        <View className="relative">
          {/* Arrows */}
          {/* {step > 1 && (
            <TouchableOpacity
              onPress={handleBack}
              className="absolute left-[-25px] top-[40%] z-10"
            >
              <Text className="text-[#60178b] text-[24px]">{`<`}</Text>
            </TouchableOpacity>
          )}
          {step < 3 && (
            <TouchableOpacity
              onPress={handleNext}
              disabled={!canProceed}
              className="absolute right-[-25px] top-[40%] z-10"
            >
              <Text className="text-[#60178b] text-[24px]" style={{ opacity: canProceed ? 1 : 0.4 }}>
                {`>`}
              </Text>
            </TouchableOpacity>
          )} */}

          {/* Form Content */}
          <View className="bg-white p-6 rounded-2xl w-full space-y-4">
            {renderStep()}

            <TouchableOpacity
              disabled={!canProceed}
              onPress={handleNext}
              className="py-3 mt-6 rounded-xl"
              style={{
                backgroundColor: yellow,
                opacity: canProceed ? 1 : 0.5,
              }}
            >
              <Text className="text-center font-poppinsBold text-[18px]" style={{ color: purple }}>
                {step < 3 ? "Next" : "Finish"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skip this for now link */}
        <TouchableOpacity onPress={() => navigation.navigate("NextScreen")}>
          <Text className="text-center text-white mt-4 underline font-poppins">Skip this for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

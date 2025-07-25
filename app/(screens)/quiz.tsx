import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/HeaderGoBack";

const screenWidth = Dimensions.get("window").width;

const quizData = [
  {
    question: "Where did the three village hunters go?",
    options: ["Forest", "Home", "School", "Market"],
    answer: "Forest",
  },
  {
    question: "What did the hunters use to track animals?",
    options: ["Dogs", "Magic", "Footprints", "Maps"],
    answer: "Footprints",
  },
  {
    question: "Who warned them not to go too deep?",
    options: ["An old man", "A wise woman", "Their chief", "Their parents"],
    answer: "An old man",
  },
  {
    question: "What animal did they encounter?",
    options: ["A lion", "A giant snake", "A bird", "A spirit"],
    answer: "A giant snake",
  },
  {
    question: "How did they escape?",
    options: ["They climbed a tree", "They ran", "They fought it", "They tricked it"],
    answer: "They tricked it",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const question = quizData[currentQuestion];

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowPopup(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(null);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowPopup(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 40 }}
      >
        <Header />
        <View className="bg-[#60178b] p-6 rounded-3xl">
          <Text className="text-white text-center text-2xl font-caprasimo mb-3">
            Question Time
          </Text>
          <Text className="text-yellow-300 font-poppinsBold text-center text-base mb-2">
            QUESTION {currentQuestion + 1}
          </Text>
          <Text className="text-white text-center text-xl font-poppins mb-6">
            {question.question}
          </Text>

          {question.options.map((option, index) => {
            let bgColor = "bg-white";
            if (selectedOption) {
              if (option === question.answer) bgColor = "bg-green-400";
              else if (option === selectedOption) bgColor = "bg-red-400";
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectOption(option)}
                disabled={!!selectedOption}
                className={`p-4 rounded-xl mb-3 ${bgColor}`}
              >
                <Text className="text-lg text-purple-800 font-poppins text-center">
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              disabled={currentQuestion === 0}
              onPress={handleBack}
              className="bg-yellow-400 px-4 py-3 rounded-full"
            >
              <Text className="text-black text-lg font-poppinsBold">← Back</Text>
            </TouchableOpacity>

            {selectedOption && (
              <TouchableOpacity
                onPress={handleNext}
                className="bg-yellow-400 px-4 py-3 rounded-full"
              >
                <Text className="text-black text-lg font-poppinsBold">Next →</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* 🟣 Popup after quiz is complete */}
      {showPopup && (
        <View className="absolute inset-0 bg-black/40 items-center justify-center px-8">
          <View className="bg-white p-6 rounded-3xl items-center w-full">
            <Image
              source={
                score >= 3
                  ? require("@/assets/images/avatar.png")
                  : require("@/assets/images/oops.png")
              }
              className="w-32 h-32 mb-4"
              resizeMode="contain"
            />
            <Text className="text-2xl font-caprasimo text-purple-800 mb-2">
              {score >= 3 ? "Well done!" : "Oops!"}
            </Text>
            <Text className="text-lg font-poppins text-black mb-4">
              You scored {score} out of {quizData.length}
            </Text>

            {score < 3 ? (
              <TouchableOpacity
                onPress={handleRetry}
                className="bg-yellow-400 px-6 py-3 rounded-full mb-3"
              >
                <Text className="text-black text-lg font-poppinsBold">
                  Try Again
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-purple-700 px-6 py-3 rounded-full"
            >
              <Text className="text-white text-lg font-poppinsBold">
                Back to Video
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

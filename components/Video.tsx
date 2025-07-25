import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Star, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

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

const { width } = Dimensions.get("window");

export default function Video() {
  const router = useRouter();
  const [playVideo, setPlayVideo] = useState(false);
  const [rating, setRating] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleOptionSelect = (option: string) => {
    const updated = [...selectedOptions];
    updated[currentQuestion] = option;
    setSelectedOptions(updated);
  };

  const submitQuiz = () => {
    let points = 0;
    selectedOptions.forEach((opt, i) => {
      if (opt === quizData[i].answer) {
        points++;
      }
    });
    setScore(points);
    setShowPopup(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setScore(null);
    setShowPopup(false);
  };

  const renderStars = () => (
    <View className="flex-row items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          className="mx-1"
        >
          <Star
            size={24}
            color={star <= rating ? "#facc15" : "#e5e7eb"}
            fill={star <= rating ? "#facc15" : "none"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View className="w-full relative">
      {!playVideo ? (
        <TouchableOpacity
          onPress={() => setPlayVideo(true)}
          className="rounded-2xl overflow-hidden my-2"
        >
          <View className="relative w-full h-56">
            <Image
              source={require("@/assets/images/cartoon.jpg")}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-12 h-12 bg-lime-300 rounded-full items-center justify-center">
                <Text className="text-black font-bold text-xl">▶</Text>
              </View>
              <Text className="text-white mt-2 font-medium font-poppins">
                Play Video
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <YoutubePlayer
          height={220}
          play={true}
          videoId={"XqZsoesa55w"}
          initialPlayerParams={{
            controls: 2,
            modestbranding: true,
            rel: false,
            showinfo: false,
          }}
        />
      )}

      <View className="w-full px-4 py-3">
        <Text className="text-purple-900 font-poppinsBold text-[23px]">
          The three village hunters
        </Text>
        <Text className="text-purple-900 text-md font-poppins">
          Story by Nutifafa Tsikata
        </Text>

        <View className="flex-row mt-3 justify-between items-center">
          {renderStars()}
          <TouchableOpacity
            disabled={score !== null}
            onPress={() => setShowQuiz(true)}
            className={`px-4 py-2 rounded-xl ${
              score !== null ? "bg-gray-400" : "bg-[#5a1786]"
            }`}
          >
            <Text className="text-white font-poppins">
              {score !== null ? `Score: ${score}/${quizData.length}` : "Start Quiz"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showQuiz && (
        <View className="absolute inset-0 bg-[#845ec2dd] items-center justify-center px-4">
          <View className="bg-white p-6 rounded-3xl w-full">
            <Text className="text-xl text-center font-bold mb-3 text-purple-900">
              Question {currentQuestion + 1}
            </Text>
            <Text className="text-lg text-center mb-5 font-poppins">
              {quizData[currentQuestion].question}
            </Text>

            <View className="flex-row flex-wrap justify-between mb-4">
              {quizData[currentQuestion].options.map((option, idx) => {
                const isSelected = selectedOptions[currentQuestion] === option;
                const isCorrect = option === quizData[currentQuestion].answer;

                let bgColor = "bg-white";
                if (score !== null) {
                  if (isCorrect) bgColor = "bg-green-300";
                  else if (isSelected) bgColor = "bg-red-300";
                } else if (isSelected) {
                  bgColor = "bg-yellow-300";
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleOptionSelect(option)}
                    className={`w-[48%] ${bgColor} rounded-md p-2 mb-2`}
                    disabled={score !== null}
                  >
                    <Text className="text-sm text-center text-purple-800 font-poppins">
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                disabled={currentQuestion === 0}
                onPress={() => setCurrentQuestion((prev) => prev - 1)}
              >
                <ChevronLeft color="#6b21a8" size={28} />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={currentQuestion === quizData.length - 1}
                onPress={() => setCurrentQuestion((prev) => prev + 1)}
              >
                <ChevronRight color="#6b21a8" size={28} />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => {
                  setShowQuiz(false);
                  setCurrentQuestion(0);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                <Text>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={selectedOptions.length < quizData.length}
                onPress={submitQuiz}
                className={`px-4 py-2 rounded-full ${
                  selectedOptions.length < quizData.length
                    ? "bg-gray-400"
                    : "bg-[#5a1786]"
                }`}
              >
                <Text className="text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showPopup && (
        <View className="absolute inset-0 bg-black/40 items-center justify-center px-6">
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

            {score < 3 && (
              <TouchableOpacity
                onPress={handleRetry}
                className="bg-yellow-400 px-6 py-3 rounded-full mb-3"
              >
                <Text className="text-black text-lg font-poppinsBold">
                  Try Again
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                setShowQuiz(false);
                setShowPopup(false);
              }}
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

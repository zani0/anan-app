import React, { useState, useRef } from "react";
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

const quizData = [
  {
    question: "What did the hunters go to the forest to do?",
    options: ["To fetch water", "To hunt", "To sleep", "To plant trees"],
    answer: "To hunt",
  },
  {
    question: "How many hunters were there?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },
];

const { width } = Dimensions.get("window");

export default function Video() {
  const [playVideo, setPlayVideo] = useState(false);
  const [rating, setRating] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

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
    setShowAnswers(true);
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
      {/* Video or Thumbnail */}
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

      {/* Title and Author */}
      <View className="w-full px-4 py-3">
        <Text className="text-purple-900 font-poppinsBold text-[23px]">
          The three village hunters
        </Text>
        <Text className="text-purple-900 text-md font-poppins">
          Story by Nutifafa Tsikata
        </Text>

        {/* Rating + Quiz Button */}
        <View className="flex-row mt-3 justify-between items-center">
          {renderStars()}
          <TouchableOpacity
            disabled={score !== null}
            onPress={() => setShowQuiz(true)}
            className={`px-4 py-2 rounded-xl ${
              score !== null
                ? "bg-gray-400"
                : "bg-[#5a1786]"
            }`}
          >
            <Text className="text-white font-poppins">
              {score !== null ? `Score: ${score}/${quizData.length}` : "Start Quiz"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* QUIZ OVERLAY */}
      {showQuiz && (
        <View
          className="absolute top-0 left-0 w-full h-full items-center justify-center"
          style={{ backgroundColor: "rgba(128, 90, 213, 0.9)" }} // Purple overlay
        >
          <View
            style={{ width: width - 40 }}
            className="bg-white rounded-xl p-5"
          >
            <Text className="text-xl text-center font-bold mb-3 text-purple-900">
              Quiz Time
            </Text>

            <Text className="text-base font-semibold text-gray-800 mb-2">
              {`Question ${currentQuestion + 1}: ${
                quizData[currentQuestion].question
              }`}
            </Text>

            {/* OPTIONS */}
            <View className="flex-row flex-wrap justify-between mb-4">
              {quizData[currentQuestion].options.map((option, idx) => {
                const isSelected = selectedOptions[currentQuestion] === option;
                const isCorrect = option === quizData[currentQuestion].answer;
                const showFeedback = showAnswers;

                let bgColor = "bg-gray-100";
                if (showFeedback) {
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
                    disabled={showAnswers}
                  >
                    <Text className="text-sm text-center">{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Navigation */}
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

            {/* Submit + Skip */}
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
    </View>
  );
}

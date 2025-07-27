import {
  CheckSquare,
  Square,
  Star,
  Star as StarIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";

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
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (selectedOptions[currentQuestion]) return;
    const updated = [...selectedOptions];
    updated[currentQuestion] = option;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const score = selectedOptions.filter(
    (option, i) => option === quizData[i].answer
  ).length;
  const points = score * 10;
  const hasTakenQuiz = selectedOptions.length > 0;

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
        <View
          style={{
            height: (width * 9) / 16,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Vimeo
            videoId="76979871"
            params="autoplay=0&loop=0&transparent=1&title=0"
          />
        </View>
      )}

      {/* Info */}
      <View className="w-full px-4 py-3">
        <Text className="text-purple-900 font-poppinsBold text-[23px]">
          The three village hunters
        </Text>
        <Text className="text-purple-900 text-md font-poppins">
          Story by Nutifafa Tsikata
        </Text>

        {/* Rating + Quiz Controls */}
        <View className="flex-row mt-3 justify-between items-center">
          {renderStars()}
          <View className="flex-row items-center space-x-3">
            {hasTakenQuiz && (
              <View className="flex-row items-center space-x-1 bg-yellow-100 px-2 py-3 rounded-full mr-2">
                <StarIcon size={16} color="#facc15" fill="#facc15" />
                <Text className="text-black font-medium">{points} pts</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                setShowQuiz(true);
                setCurrentQuestion(0);
                setSelectedOptions([]);
                setShowScore(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#5D1889]"
            >
              <Text className="text-white font-poppins">
                {hasTakenQuiz ? "Retake Quiz" : "Start Quiz"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quiz Modal */}
      <Modal transparent visible={showQuiz} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white p-6 rounded-3xl w-full max-w-xl shadow-xl">
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={require("@/assets/images/avatar.png")}
                className="w-24 h-24 mx-auto mb-4"
                resizeMode="contain"
              />
              {showScore ? (
                <View className="items-center">
                  <Text className="text-2xl font-bold text-purple-800 mb-2">
                    🎉 Quiz Completed!
                  </Text>
                  <Text className="text-lg text-black mb-2 text-center">
                    You got {score} out of {quizData.length} correct!
                  </Text>
                  <View className="flex-row items-center mb-4">
                    <StarIcon size={20} color="#facc15" fill="#facc15" />
                    <Text className="ml-2 text-black font-semibold text-lg">
                      {points} Points
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowQuiz(false)}
                    className="bg-purple-700 px-6 py-3 rounded-full"
                  >
                    <Text className="text-white text-lg font-bold">
                      Back to Video
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text className="text-lg font-bold text-purple-800 mb-2 text-center">
                    Question {currentQuestion + 1} of {quizData.length}
                  </Text>
                  <Text className="text-base text-black font-semibold mb-4 text-center">
                    {quizData[currentQuestion].question}
                  </Text>

                  {quizData[currentQuestion].options.map((option, i) => {
                    const selected = selectedOptions[currentQuestion];
                    const isCorrect =
                      selected && option === quizData[currentQuestion].answer;
                    const isWrong =
                      selected === option &&
                      option !== quizData[currentQuestion].answer;

                    let bgColor = "bg-gray-100";
                    if (selected) {
                      if (isCorrect) bgColor = "bg-green-400";
                      else if (isWrong) bgColor = "bg-red-400";
                    }

                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => handleOptionSelect(option)}
                        className={`flex-row items-center gap-3 px-4 py-3 mb-2 rounded-lg ${bgColor}`}
                        disabled={!!selected}
                      >
                        {selected === option ? (
                          <CheckSquare color="#4b0082" size={24} />
                        ) : (
                          <Square color="#4b0082" size={24} />
                        )}
                        <Text className="text-black text-base">{option}</Text>
                      </TouchableOpacity>
                    );
                  })}

                  <View className="flex-row justify-between items-center mt-4">
                    <TouchableOpacity
                      onPress={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="px-4 py-2 rounded-lg bg-gray-300"
                    >
                      <Text className="text-black">Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleNext}
                      disabled={!selectedOptions[currentQuestion]}
                      className={`px-4 py-2 rounded-lg ${
                        selectedOptions[currentQuestion]
                          ? "bg-purple-700"
                          : "bg-gray-300"
                      }`}
                    >
                      <Text className="text-white">
                        {currentQuestion === quizData.length - 1
                          ? "Finish"
                          : "Next"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
